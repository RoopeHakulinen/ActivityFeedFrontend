module.service('fileSystemService', function () {

	this.readFile = function (filename, callback)
	{
		console.log("Accessing file system.");

		function gotFileEntry(fileEntry) {
			console.log("Got the file entry for reading.");
			fileEntry.file(actualReadFile);
		}

		function onFileSystemSuccess(fileSystem) {
			//var file = cd(filename);
			console.log("Trying to read from " + filename);
			fileSystem.root.getFile(filename,
				{create: true, exclusive: false},
				gotFileEntry, this.errorHandler);
		}

		function actualReadFile(fileObject)
		{
			var reader = new FileReader();
			reader.onloadend = function(event)
			{
				var text = event.target.result;
				console.log("File was read, calling callback provided. ");
				callback(text);
			};
			reader.readAsText(fileObject);
		}
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, this.errorHandler);
	};

	this.writeFile = function(filename, textToWrite, callback)
	{


		function onFileSystemSuccess(fileSystem) {
			console.log("Trying to write to " + filename);
			fileSystem.root.getFile(filename,
				{create: true, exclusive: false},
				gotFileEntry, this.errorHandler);

			function gotFileEntry(fileEntry) {
				console.log("Got the file entry.");
				fileEntry.file(saveFileContent);

				function saveFileContent()
				{
					fileEntry.createWriter(gotFileWriter, this.errorHandler);

					function gotFileWriter(writer)
					{
						writer.write(textToWrite);
						writer.onwriteend = function(event) {
							console.log("File written.");
							if (typeof callback === "function")
							{
								var url = fileEntry.toURL();
								console.log("Got URL " + url)
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