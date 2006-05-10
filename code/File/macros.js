/**
 * macro rendering alias
 */
function alias_macro(param) {
   if (param.as == "editor")
      Html.input(this.createInputParam("alias", param));
   else if (param.as == "link") {
      param.to = "getfile"
      param.urlparam = "name=" + escape(this.alias);
      param.title = encodeForm(this.description);
      Html.openTag("a", this.site.createLinkParam(param));
      res.write(this.alias);
      Html.closeTag("a");
   } else
      res.write(this.alias);
   return;
}

/**
 * macro rendering description
 */
function description_macro(param) {
   if (param.as == "editor")
      Html.textArea(this.createInputParam("description", param));
   else if (this.description)
      res.write(this.description);
   return;
}

/**
 * macro renders the url of this file
 */
function url_macro(param) {
   return this.getUrl();
}

/**
 * macro renders a link for editing a file
 */
function editlink_macro(param) {
   if (session.user) {
      try {
         this.checkEdit(session.user, req.data.memberlevel);
      } catch (deny) {
         return;
      }
      Html.link({href: this.href("edit")}, param.text ? param.text : getMessage("generic.edit"));
   }
   return;
}

/**
 * macro rendering a link to delete
 * if user is creator of this file
 */
function deletelink_macro(param) {
   if (session.user) {
      try {
         this.checkEdit(session.user, req.data.memberlevel);
      } catch (deny) {
         return;
      }
      Html.openLink({href: this.href("delete")});
      if (param.image && this.site.images.get(param.image))
         renderImage(this.site.images.get(param.image), param);
      else
         res.write(param.text ? param.text : getMessage("generic.delete"));
      Html.closeLink();
   }
   return;
}

/**
 * macro rendering a link to view the file
 */
function viewlink_macro(param) {
   if (session.user) {
      param.to = "getfile"
      param.urlparam = "name=" + escape(this.alias);
      param.title = encodeForm(this.description);
      Html.openTag("a", this.site.createLinkParam(param));
      res.write(param.text ? param.text : getMessage("generic.view"));
      Html.closeTag("a");
   }
   return;
}

/**
 * macro rendering filesize
 */
function filesize_macro(param) {
   res.write((this.filesize / 1024).format("###,###") + " KB");
   return;
}

/**
 * macro rendering the mimetype
 */
function mimetype_macro(param) {
   res.write(this.mimetype);
   return;
}

/**
 * macro rendering the file extension from the name
 */
function filetype_macro(param) {
   if (this.mimetype)
      res.write(this.mimetype.substring(this.mimetype.indexOf("/") + 1));
   else {
      var i = this.name.lastIndexOf(".");
      if (i > -1)
         res.write(this.name.substring(i+1, this.name.length));
   }
   return;
}

/**
 * macro rendering the number of requests so far
 * for a file-object
 */
function clicks_macro(param) {
   if (!this.requestcnt)
      res.write(param.no ? param.no : getMessage("File.download.no"));
   else if (this.requestcnt == 1)
      res.write(param.one ? param.one : getMessage("File.download.one"));
   else {
      res.write(this.requestcnt);
      res.write(param.more ? param.more : " " + getMessage("File.download.more"));
   }
   return;
}
