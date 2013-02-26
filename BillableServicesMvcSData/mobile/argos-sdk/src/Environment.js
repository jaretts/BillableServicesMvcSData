/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define('Sage/Platform/Mobile/Environment', [
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/has',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/_base/sniff'
], function(
    lang,
    win,
    has,
    string,
    domConstruct
) {
    return lang.setObject('Sage.Platform.Mobile.Environment', {
        // todo: open a new browser window for these when on a mobile device?
        // on a mobile device, launching an external handler can impact a view transition, and cause issues, which the timeout takes care of.
        // not the best way, perhaps a post-transition callback should be used for launching these? check transitioning, then queue if needed?
        initiateCall: function(number) {
            setTimeout(function() {
                window.location.href = string.substitute("tel:${0}", [number]);
            }, 50);
        },
        initiateEmail: function(email, subject, body) {
            setTimeout(function() {
                var mailtoUri = (subject)
                    ? string.substitute("mailto:${0}?subject=${1}&body=${2}", [email, subject, body||''])
                    : string.substitute("mailto:${0}", [email]);
                window.location.href = mailtoUri;
            }, 1000); // 1 sec delay for iPad iOS5 to actually save nav state to local storage
        },
        showMapForAddress: function(address) {
            setTimeout(function() {
                var eventFire = function(node, eventType){
                    if (node.fireEvent)
                    { // for IE
                        node.fireEvent('on' + eventType);
                        node[eventType]();
                    }
                    else
                    {
                        var event = document.createEvent('MouseEvents');
                        event.initMouseEvent(eventType, true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        node.dispatchEvent(event);

                        // FF 3.6-4 do not follow untrusted events, fixed in FF5+
                        // https://bugzilla.mozilla.org/show_bug.cgi?id=666604
                        if (has('ff') < 5)
                            window.open(node.href);
                    }
                };

                var hiddenLink = domConstruct.create('a', {
                    href: string.substitute("http://maps.google.com/maps?q=${0}", [address]),
                    target: '_blank'
                }, win.body(), 'last');

                eventFire(hiddenLink, 'click');

                domConstruct.destroy(hiddenLink);

            }, 50);
        }
    });
});