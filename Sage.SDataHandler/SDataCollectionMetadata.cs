using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Net.Http;

namespace Sage.SDataHandler
{
    [DataContract]
    public class SDataCollectionMetadata<T> where T : class
    {
        [DataMember(Name = "$url")]
        public String url { get; set; }

        [DataMember(Name = "$totalResults")]
        public int TotalResults { get; set; }

        [DataMember(Name = "$startIndex")]
        public int StartIndex { get; set; }

        [DataMember(Name = "$itemsPerPage")]
        public int ItemsPerPage { get; set; }

        [DataMember(Name="$next")]
        public String Next { get; set; }

        [DataMember(Name = "$previous")]
        public String previous { get; set; }

        [DataMember(Name = "$first")]
        public String First { get; set; }

        [DataMember(Name = "$last")]
        public String Last { get; set; }

        [DataMember(Name = "$resources")]
        public T[] Resources { get; set; }

        public SDataCollectionMetadata(HttpResponseMessage httpResponse, bool isIQueryable)
        {
            //this.Timestamp = DateTime.Now;
            if (httpResponse.Content != null && httpResponse.IsSuccessStatusCode)
            {
                Uri reqUri = httpResponse.RequestMessage.RequestUri;
                string urlval = reqUri.Scheme + "://" + reqUri.Authority + reqUri.LocalPath;

                this.url = urlval;
                //this.url = reqUri.AbsoluteUri;
                this.TotalResults = 1;
                this.ItemsPerPage = 1;

                if (isIQueryable)
                {
                    IEnumerable<T> enumResponseObject;

                    this.StartIndex = SDataUriUtil.GetSDataStartIndexValue(reqUri);
                    httpResponse.TryGetContentValue<IEnumerable<T>>(out enumResponseObject);

                    if (enumResponseObject != null)
                    {
                        this.Resources = enumResponseObject.ToArray();
                        this.ItemsPerPage = enumResponseObject.Count();

                        int nxtStart = ItemsPerPage + StartIndex;
                        int countParam = SDataUriUtil.GetSDataCountValue(reqUri);
                        if (countParam < 0)
                            countParam = 10;

                        Next = urlval + "?" + SDataUriKeys.SDATA_STARTINDEX + "=" + nxtStart + "&" + SDataUriKeys.SDATA_COUNT + "=" + countParam;
                        //Next = SDataUriUtil.ReplaceSingleParam(reqUri, SDataUriKeys.SDATA_STARTINDEX, "" + nxtStart).AbsoluteUri;

                        int prvStart = StartIndex - ItemsPerPage;
                        if (prvStart > 0)
                        {
                            previous = urlval + "?" + SDataUriKeys.SDATA_STARTINDEX + "=" + prvStart + "&" + SDataUriKeys.SDATA_COUNT + "=" + countParam;
                            //previous = SDataUriUtil.ReplaceSingleParam(reqUri, SDataUriKeys.SDATA_STARTINDEX, "" + prvStart).AbsoluteUri;
                        }
                        else
                        {
                            this.previous = "";
                        }

                        First = urlval + "?" + SDataUriKeys.SDATA_STARTINDEX + "=1&" + SDataUriKeys.SDATA_COUNT + "=" + countParam;
                        //First = SDataUriUtil.ReplaceSingleParam(reqUri, SDataUriKeys.SDATA_STARTINDEX, "" + 1).AbsoluteUri;
                        this.Last = Next; // TODO must resolve how many more pages
                        //this.Last = this.url;
                    }
                }
            }
            else
            {
                //this.Status = "Error";
                this.ItemsPerPage = 0;
            }
        }
    }
}