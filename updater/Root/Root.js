//
// The Antville Project
// http://code.google.com/p/antville
//
// Copyright 2001-2007 by The Antville People
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// $Revision$
// $LastChangedBy$
// $LastChangedDate$
// $URL$
//

Root.prototype.start_action = function() {
   app.invokeAsync(global, function() {
      execute(sql("tag"));
      execute(sql("tag_hub"));
      execute(sql("log"));
      //update("AV_ACCESSLOG");
      update("AV_CHOICE");
      update("AV_FILE");
      update("AV_IMAGE");
      update("AV_LAYOUT");
      update("AV_MEMBERSHIP");
      update("AV_POLL");
      update("AV_SITE");
      update("AV_SKIN");
      update("AV_TEXT");
      update("AV_USER");
      update("AV_VOTE");
      update("AV_SYSLOG"); // This has to go last
      return;
   }, [], -1);
   renderSkin("Global");
   return;

   app.invokeAsync(global, function() {
      for (var i=0; i<10; i+=1) {
         log(i);
         for (var w=0; w<10000000; w+=1) {}
      }
   }, [], 5000);
};

Root.prototype.out_action = function() {
   res.contentType = "text/plain";
   if (app.data.out) {
      res.write(app.data.out.toString());
      app.data.out.setLength(0);
   }
   return;
};