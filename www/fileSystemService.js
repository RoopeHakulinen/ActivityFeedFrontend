module.service('fileSystemService', function () {
	this.loadedFiles = [];

	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

	this.readFile = function (filename, callback)
	{
		if (this.loadedFiles[filename])
		{
			console.log("Cache hit!");
			callback(this.loadedFiles[filename]);
			return;
		}

		function gotFileEntry(fileEntry) {
			fileEntry.file(actualReadFile.bind(this));
		}

		function onFileSystemSuccess(fileSystem) {
			console.log("Trying to read from " + filename);

			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
				dirEntry.getFile(filename, {create: true, exclusive: false}, gotFileEntry.bind(this), this.errorHandler);
			}.bind(this));
		}

		function actualReadFile(fileObject)
		{
			var reader = new FileReader();
			reader.onloadend = function(event)
			{
				var text = event.target.result;
				console.log("File was read, calling callback provided. ");
				this.loadedFiles[filename] = text; // Store to cache
				callback(text);
			}.bind(this);
			reader.readAsText(fileObject);
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess.bind(this), this.errorHandler);
	};

	this.writeFile = function(filename, textToWrite, append, callback)
	{
		if (typeof append === "undefined")
		{
			append = false;
		}
		function onFileSystemSuccess(fileSystem) {
			console.log("Trying to write to " + filename);
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
				dirEntry.getFile(filename, {create: true, exclusive: false}, gotFileEntry, this.errorHandler);
			});

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
						writer.write(textToWrite);
						writer.onwriteend = function(event) {
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

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, this.errorHandler);
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
		};
		console.log('File system error: ' + msg);
		alert('File system error: ' + msg);
	}
});