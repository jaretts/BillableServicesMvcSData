using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace Sage.SDataHandler
{
    public class SDataUriUtil
    {
        public static Uri TranslateUri(Uri requestUri, int convertDirection)
        {
            NameValueCollection query = requestUri.ParseQueryString();
            string translatedUriQuery = "";
            bool foundStartIndex = false, foundOrderBy = false;

            foreach (string key in query.AllKeys) // <-- No duplicates returned.
            {
                string translatedKey;

                if (key.ToLower().Equals(SDataUriKeys.ODATA_STARTINDEX.ToLower()) || key.ToLower().Equals(SDataUriKeys.SDATA_STARTINDEX.ToLower()))
                {
                    foundStartIndex = true;
                }
                else if (key.ToLower().Equals(SDataUriKeys.ODATA_ORDERBY.ToLower()) || key.ToLower().Equals(SDataUriKeys.SDATA_ORDERBY.ToLower()))
                {
                    foundOrderBy = true;
                }

                // check for startIndex or $skip
                ConvertStartIndexValue(query, key, convertDirection);

                if (convertDirection == SDataUriKeys.CONVERT_TO_ODATA)
                {
                    // convert any known SData keys to OData keys
                    translatedKey = ConvertSDataKeyToODataKey(key);
                }
                else
                {
                    // convert any known OData keys SData
                    translatedKey = ConvertODataKeyToSDataKey(key);
                }

                if (translatedUriQuery.Length > 0)
                {
                    // need to append sep
                    translatedUriQuery += "&";
                }

                // Add the name and value to the new query portion
                translatedUriQuery += ReplaceParamName(translatedKey, query[key]);
            }

            Uri retValue;
            if (string.IsNullOrEmpty(translatedUriQuery))
            {
                // no changes required
                retValue = requestUri;
            }
            else
            {
                if (foundStartIndex && !foundOrderBy)
                {
                    // need to add an orderby because can't do skip without it
                    if (convertDirection == SDataUriKeys.CONVERT_TO_ODATA)
                    {
                        translatedUriQuery += "&" + SDataUriKeys.ODATA_ORDERBY;
                    }
                    else
                    {
                        translatedUriQuery += "&" + SDataUriKeys.ODATA_ORDERBY;
                    }

                    translatedUriQuery += "='ID'";
                }

                // Need to replace the old Query portion on Uri
                retValue = ReplaceQueryPortionOfUri(requestUri, translatedUriQuery);
            }
            return retValue;
        }

        private static void ConvertStartIndexValue(NameValueCollection query, string key, int convertDirection)
        {
            // make sure this is a key to an SData StartIndex or OData $skip
            if (String.Equals(key, SDataUriKeys.SDATA_STARTINDEX) || String.Equals(key, SDataUriKeys.ODATA_STARTINDEX))
            {
                // if startIndex then need to convert the value of this param because
                // OData is 0 based and SData is 1 based
                int startIndx = int.Parse(query[key]);
                if (convertDirection == SDataUriKeys.CONVERT_TO_ODATA && String.Equals(key, SDataUriKeys.SDATA_STARTINDEX))
                {
                    // need to decrement to convert startIndex to $skip
                    startIndx = Math.Max(startIndx - 1, 0);
                }
                else if (convertDirection == SDataUriKeys.CONVERT_TO_SDATA && String.Equals(key, SDataUriKeys.ODATA_STARTINDEX))
                {
                    // need to increment to convert $skip to startIndex
                    //startIndx++;
                }
                query[key] = "" + startIndx;
            }
        }


        private static string ConvertSDataKeyToODataKey(string key)
        {
            string translatedKey = null;

            switch (key.ToLower())
            {
                case SDataUriKeys.SDATA_STARTINDEX:
                    translatedKey = SDataUriKeys.ODATA_STARTINDEX;
                    break;
                case SDataUriKeys.SDATA_COUNT:
                    translatedKey = SDataUriKeys.ODATA_COUNT;
                    break;
                case SDataUriKeys.SDATA_ORDERBY:
                    translatedKey = SDataUriKeys.ODATA_ORDERBY;
                    break;
                case SDataUriKeys.SDATA_INCLUDE:
                    // odata include ($expand) not working so map back to include and handle in repository or controllers
                    //translatedKey = SDataUriKeys.ODATA_INCLUDE;
                    translatedKey = SDataUriKeys.SDATA_INCLUDE;
                    break;
                case SDataUriKeys.SDATA_SELECT:
                    translatedKey = SDataUriKeys.ODATA_SELECT;
                    break;
                case SDataUriKeys.SDATA_WHERE:
                    translatedKey = SDataUriKeys.ODATA_WHERE;
                    // now scan for mul, div, mod and replace with multiply, divide, modulo, etc
                    //string valueOfWhere = query["where"];
                    break;
                default:
                    // this is not a recognized SData key so leave it alone
                    translatedKey = key;
                    break;
            }
            return translatedKey;
        }

        private static string ConvertODataKeyToSDataKey(string key)
        {
            string translatedKey = null;

            switch (key.ToLower())
            {
                case SDataUriKeys.ODATA_STARTINDEX:
                    translatedKey = SDataUriKeys.SDATA_STARTINDEX;
                    break;
                case SDataUriKeys.ODATA_COUNT:
                    translatedKey = SDataUriKeys.SDATA_COUNT;
                    break;
                case SDataUriKeys.ODATA_ORDERBY:
                    translatedKey = SDataUriKeys.SDATA_ORDERBY;
                    break;
                case SDataUriKeys.ODATA_INCLUDE:
                    translatedKey = SDataUriKeys.SDATA_INCLUDE;
                    break;
                case SDataUriKeys.ODATA_SELECT:
                    translatedKey = SDataUriKeys.SDATA_SELECT;
                    break;
                case SDataUriKeys.ODATA_WHERE:
                    translatedKey = SDataUriKeys.SDATA_WHERE;
                    // now scan for mul, div, mod and replace with multiply, divide, modulo, etc
                    //string valueOfWhere = query["where"];
                    break;
                default:
                    // this is not a recognized SData key so leave it alone
                    translatedKey = key;
                    break;
            }
            return translatedKey;
        }

        private static Uri ReplaceQueryPortionOfUri(Uri requestUri, string translatedQuery)
        {
            Uri retValue;
            // there were params to map from sdata to odata
            string originalUri = requestUri.AbsoluteUri;
            originalUri = originalUri.Substring(0, originalUri.IndexOf('?') + 1);

            retValue = new Uri(originalUri + translatedQuery);
            return retValue;
        }

        public static Uri ReplaceSingleParam(Uri uri, string paramName, string value)
        {
            NameValueCollection query = uri.ParseQueryString();

            Uri retVal;

            if (query.AllKeys.Contains(paramName))
            {
                query[paramName] = value;

                string uriQuery = ToQueryString(query, null, false);

                retVal = ReplaceQueryPortionOfUri(uri, uriQuery);
            }
            else
            {
                retVal = uri;
            }

            return retVal;
        }

        private static string ReplaceParamName(string translatedKey, String value)
        {
            String retValue = "";

            if (!String.IsNullOrEmpty(translatedKey))
            {
                // TODO remove this. This is a workaround for error in Argos where 
                // a query like: "(UserID eq 1 and (Status eq 0) and (ProjectID eq \"1\") )"
                // is sent but ProjectID is not a numeric so there should not be quo aroud it
                // this is a workaround for POC that simply finds ID (all should be numeric) and 
                // removes quo if URI where contains quo
                if (value != null && value.Contains("ID eq \""))
                {
                    // need to strip quo
                    // TODO fix Argos Client should not have " around ProjectID
                    int quoPos = value.IndexOf("ID eq \"") + "ID eq \"".Length - 1;

                    value = value.Remove(quoPos, 1);

                    int quoPos2 = value.IndexOf('"', quoPos);

                    value = value.Remove(quoPos2, 1);
                }

                retValue = translatedKey + "=" + value;
            }

            return retValue;
        }

        public static void SetAcceptJsonHeader(HttpRequestMessage request, Uri originalUri)
        {
            NameValueCollection query = originalUri.ParseQueryString();
            if (query[SDataUriKeys.SDATA_FORMAT_PARAM] != null)
            {
                String payloadFmt = query[SDataUriKeys.SDATA_FORMAT_PARAM];
                if (payloadFmt.ToLower().Equals(SDataUriKeys.JSON_FORMAT_TYPE))
                {
                    // this is one way to request JSON format payloads in SData
                    // MVC will require a header
                    request.Headers.Accept.Add(SDataUriKeys.JSON_ACCEPT_HEADER);
                }
            }
        }

        public static int GetSDataStartIndexValue(Uri aUri)
        {
            NameValueCollection query = aUri.ParseQueryString();//. HttpUtility.ParseQueryString(aUri.Query);
            String retVal = ExtractParamFromQuery(query, SDataUriKeys.SDATA_STARTINDEX, SDataUriKeys.ODATA_STARTINDEX);

            if (String.IsNullOrEmpty(retVal))
            {
                return 1;
            }
            else
            {
                return int.Parse(retVal);
            }

        }

        public static int GetSDataCountValue(Uri aUri)
        {
            NameValueCollection query = aUri.ParseQueryString(); //HttpUtility.ParseQueryString(aUri.Query);
            String retVal = ExtractParamFromQuery(query, SDataUriKeys.SDATA_COUNT, SDataUriKeys.ODATA_COUNT);

            if (String.IsNullOrEmpty(retVal))
            {
                return -1;
            }
            else
            {
                return int.Parse(retVal);
            }

        }


        private static string ExtractParamFromQuery(NameValueCollection query, String sDataKey, String oDataKey)
        {
            String retVal = null;

            if (query.AllKeys.Contains(sDataKey))
            {
                retVal = query[sDataKey];
            }
            else if (query.AllKeys.Contains(oDataKey))
            {
                retVal = query[oDataKey];
            }

            if (string.IsNullOrWhiteSpace(retVal))
            {
                retVal = "";
            }

            return retVal;
        }

        /// <summary>
        /// Constructs a NameValueCollection into a query string.
        /// </summary>
        /// <remarks>Consider this method to be the opposite of "System.Web.HttpUtility.ParseQueryString"</remarks>
        /// <param name="parameters">The NameValueCollection</param>
        /// <param name="delimiter">The String to delimit the key/value pairs</param>
        /// <returns>A key/value structured query string, delimited by the specified String</returns>
        public static string ToQueryString(NameValueCollection parameters, String delimiter, Boolean omitEmpty)
        {
            if (String.IsNullOrEmpty(delimiter))
                delimiter = "&";
            Char equals = '=';
            List<String> items = new List<String>();
            for (int i = 0; i < parameters.Count; i++)
            {
                foreach (String value in parameters.GetValues(i))
                {
                    Boolean addValue = (omitEmpty) ? !String.IsNullOrEmpty(value) : true;
                    if (addValue)
                        items.Add(String.Concat(parameters.GetKey(i), equals, HttpUtility.UrlEncode(value)));
                }
            }

            return String.Join(delimiter, items.ToArray());
        }


    }
}