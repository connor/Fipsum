chrome.contextMenus.create({
	"title": "Fipsum",
	"contexts": ["page"],
	"type" : "normal",
	"onclick" : function(info, tab) {
		chrome.tabs.executeScript(null, {
			code:"fipsum()"
		});
	}
});