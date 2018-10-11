const log = (text, how) => {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(text));
	if(how && how.after) {
		how.after.parentNode.insertBefore(div, how.after.nextSibling);
	} else {
		document.body.appendChild(div);
	}
}

const getKeys = (o,filtered) => {
	const f = {};
    filtered.forEach(k=>f[k]=true);
	const keys = [];
	for(k in o) {
		if(!f[k]) {
			keys.push(k);
		}
	}
	keys.sort();
	return keys;
};

const n = navigator;

log("Application Name : "+n.appName);
log("Application Code Name : "+n.appCodeName);
log("Vendor : "+n.vendor);
log("Product : "+n.product);
log("Platform : "+n.platform);
log("productSub : "+n.productSub);
log("vendorSub : "+n.vendorSub);
log("cookieEnabled : "+n.cookieEnabled);
log("deviceMemory : "+n.deviceMemory);
log("hardwareConcurrency : "+n.hardwareConcurrency);
log("language : "+n.language);
log("maxTouchPoints : "+n.maxTouchPoints);
log("onLine : "+n.onLine);
log("appVersion : "+n.appVersion);
log("userAgent : "+n.userAgent);

const createButton = (title, handler)=>{
	const button = document.createElement('button');
	button.appendChild(document.createTextNode(title));
	button.addEventListener('click', handler);
	document.body.appendChild(button);
}

createButton('Reserve budget', (e)=>{
  const reserved = navigator.budget.reserve();
  msg = reserved?"Budget reserved":"Denied";
  log(msg, {after:e.target});
});

createButton('Vibrate', (e)=>{
  log("Vibrating !", {after:e.target});
  navigator.vibrate();
});

createButton('Refresh plugins', (e)=>{
  navigator.plugins.refresh();
  log("Plugins refreshed (but screen content is not up to date)", {after:e.target});
});

const plugins = navigator.plugins;
for(let pidx = 0 ; pidx < plugins.length ; ++pidx) {
	const plugin = plugins[pidx];
	log("Plugin #"+pidx);
	log("_ Name: "+plugin.name);
	if(plugin.description) {
		log("_ Description: "+plugin.description);
	}
	log("_ Filename: "+plugin.filename);

    if(plugin.length) {
		for(let i = 0 ; i < plugin.length ; ++i) {
			const plugini = plugin[i];
			log("_ Plugin #"+pidx+" #"+i);
			if(plugini.description) {
				log("_ _ Description: "+plugini.description);
			}
			log("_ _ Suffixes: "+plugini.suffixes);
			log("_ _ Type: "+plugini.type);

		}
	}
	document.body.appendChild(document.createElement('hr'));
}

getKeys(n.clipboard, []).forEach(key=>log("clipboard."+key + " : " + typeof(n.clipboard[key])));
getKeys(n.connection, []).forEach(key=>log("connection."+key + " : " + typeof(n.connection[key])));
getKeys(n.credentials, []).forEach(key=>log("credentials."+key + " : " + typeof(n.credentials[key])));
getKeys(n.doNotTrack, []).forEach(key=>log("doNotTrack."+key + " : " + typeof(n.doNotTrack[key])));
getKeys(n.geolocation , []).forEach(key=>log("geolocation."+key + " : " + typeof(n.geolocation[key])));
getKeys(n.keyboard, []).forEach(key=>log("keyboard."+key + " : " + typeof(n.keyboard[key])));
getKeys(n.mediaCapabilities, []).forEach(key=>log("mediaCapabilities."+key + " : " + typeof(n.mediaCapabilities[key])));
getKeys(n.mediaDevices, []).forEach(key=>log("mediaDevices."+key + " : " + typeof(n.mediaDevices[key])));
getKeys(n.mimeTypes, []).forEach(key=>log("mimeTypes."+key + " : " + typeof(n.mimeTypes[key])));
getKeys(n.permissions, []).forEach(key=>log("permissions."+key + " : " + typeof(n.permissions[key])));
getKeys(n.presentation, []).forEach(key=>log("presentation."+key + " : " + typeof(n.presentation[key])));
getKeys(n.serviceWorker, []).forEach(key=>log("serviceWorker."+key + " : " + typeof(n.serviceWorker[key])));
getKeys(n.storage, []).forEach(key=>log("storage."+key + " : " + typeof(n.storage[key])));
getKeys(n.usb, []).forEach(key=>log("usb."+key + " : " + typeof(n.usb[key])));

getKeys(n, ['appCodeName','appName','appVersion', 'cookieEnabled', 'deviceMemory', 'hardwareConcurrency', 'language', 'maxTouchPoints', 'onLine', 'platform', 'product',
'productSub', 'userAgent', 'vendor', 'vendorSub', 'budget', 'clipboard', 'connection', 'credentials', 'doNotTrack', 'geolocation', 'keyboard', 'mediaCapabilities', 'mediaDevices', 'mimeTypes', 'permissions', 'plugins',
'presentation', 'serviceWorker', 'storage', 'usb', 'vibrate']).forEach(key=>log(key + " : " + typeof(n[key])));
