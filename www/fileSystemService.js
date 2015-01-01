module.service('fileSystemService', function () {
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	this.readFile = function (filename, callback, temp)
	{
		function gotFileEntry(fileEntry) {
			fileEntry.file(actualReadFile.bind(this));
		}

		function onFileSystemSuccess(fileSystem) {
			console.log("Trying to read from " + filename);

			if (isPhoneGapApp)
			{
				window.resolveLocalFileSystemURL(this.getDirectory(), function(dirEntry) {
					dirEntry.getFile(filename, {create: true, exclusive: false}, gotFileEntry.bind(this), this.errorHandler);
				}.bind(this));
			}
			else
			{
				fileSystem.root.getFile(filename, {create: true, exclusive: false}, gotFileEntry.bind(this), this.errorHandler);
			}
		}

		function actualReadFile(fileObject)
		{
			var reader = new FileReader();
			reader.onloadend = function(event)
			{
				var text = event.target.result;
				console.log("File was read, calling callback provided. ");
				callback(text);
			}.bind(this);
			if (temp == 1)
			{
				reader.readAsBinaryString(fileObject);
			}
			else if(temp == 2)
			{
				reader.readAsArrayBuffer(fileObject);
			}
			else if(temp == 3)
			{
				reader.readAsDataURL(fileObject);
			}
			else
			{
				reader.readAsText(fileObject);
			}
		}

		if (isPhoneGapApp)
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess.bind(this), this.errorHandler);
		}
		else
		{
			navigator.webkitPersistentStorage.requestQuota(1024*1024*1024, function(grantedBytes) {
				window.webkitRequestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, onFileSystemSuccess.bind(this), this.errorHandler);
			}, function(e) {
				console.log('Error', e);
			});
		}
	};

	this.writeFile = function(filename, textToWrite, append, callback, mimeType)
	{
		if (typeof append === "undefined")
		{
			append = false;
		}
		if (typeof mimeType === "undefined")
		{
			mimeType = "text/plain";
		}
		function onFileSystemSuccess(fileSystem) {
			console.log("Trying to write to " + filename);

			if (isPhoneGapApp)
			{
				window.resolveLocalFileSystemURL(this.getDirectory(), function(dirEntry) {
					dirEntry.getFile(filename, {create: true, exclusive: false}, gotFileEntry.bind(this), this.errorHandler);
				}.bind(this));
			}
			else
			{
				fileSystem.root.getFile(filename, {create: true, exclusive: false}, gotFileEntry.bind(this), this.errorHandler);
			}

			function gotFileEntry(fileEntry) {
				fileEntry.file(saveFileContent);

				function saveFileContent()
				{
					fileEntry.createWriter(gotFileWriter, this.errorHandler);

					function gotFileWriter(writer)
					{
						if (append)
						{
							writer.seek(writer.length);
						}
						if (!isPhoneGapApp)
						{
							textToWrite = new Blob([textToWrite], {type: mimeType});
						}
						writer.write(textToWrite);
						writer.onwriteend = function() {
							if (typeof callback === "function")
							{
								var url = fileEntry.toURL();
								console.log("File written to " + url);
								callback(url);
							}
						};
					}
				}
			}
		}

		if (isPhoneGapApp)
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess.bind(this), this.errorHandler);
		}
		else
		{
			navigator.webkitPersistentStorage.requestQuota(1024*1024, function(grantedBytes) {
				window.webkitRequestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, onFileSystemSuccess.bind(this), this.errorHandler);
			}, function(e) {
				console.log('Error', e);
			});
		}
	};

	this.errorHandler = function (e) {
		var msg = '';
		switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:
				msg = 'QUOTA_EXCEEDED_ERR';
				break;
			case FileError.NOT_FOUND_ERR:
				msg = 'NOT_FOUND_ERR';
				break;
			case FileError.SECURITY_ERR:
				msg = 'SECURITY_ERR';
				break;
			case FileError.INVALID_MODIFICATION_ERR:
				msg = 'INVALID_MODIFICATION_ERR';
				break;
			case FileError.INVALID_STATE_ERR:
				msg = 'INVALID_STATE_ERR';
				break;
			default:
				msg = 'Unknown Error';
				break;
		}
		console.log('File system error: ' + msg);
		alert('File system error: ' + msg);
	};

	this.getBaseURL = function ()
	{
		return this.getDirectory();
	};

	this.getDirectory = function ()
	{
		var directory = cordova.file.dataDirectory;
		if (navigator.userAgent.match(/Android/i))
		{
			directory = cordova.file.externalDataDirectory;
		}
		return directory;
	};
});