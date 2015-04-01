module.service('fileSystemService', function ()
{
	this.readFile = function (fileName, callback, readType)
	{
		function actualReadFile(fileObject)
		{
			var reader = new FileReader();
			reader.onloadend = function (event)
			{
				var text = event.target.result;
				console.log("File was read, calling callback provided. ");
				callback(text);
			}.bind(this);
			if (readType == 1)
			{
				reader.readAsBinaryString(fileObject);
			}
			else if (readType == 2)
			{
				reader.readAsArrayBuffer(fileObject);
			}
			else if (readType == 3)
			{
				reader.readAsDataURL(fileObject);
			}
			else
			{
				reader.readAsText(fileObject);
			}
		}

		this._getFileObject(fileName, actualReadFile);
	};

	this.writeFile = function (fileName, data, append, callback, mimeType)
	{
		if (typeof append === "undefined")
		{
			append = false;
		}
		if (typeof mimeType === "undefined")
		{
			mimeType = "text/plain";
		}

		function saveFileContent(fileEntry)
		{
			function gotFileWriter(writer)
			{
				if (append)
				{
					writer.seek(writer.length);
				}
				writer.write(data);
				writer.onwriteend = function ()
				{
					if (typeof callback === "function")
					{
						var url = fileEntry.toURL();
						console.log("File written to " + url);
						callback(url);
					}
				};
			}

			fileEntry.createWriter(gotFileWriter.bind(this), this._errorHandler.bind(this));
		}

		this._getFileEntry(fileName, saveFileContent);
	};

	this.moveFile = function (from, to, onSuccess)
	{
		function _gotFileEntry(fileEntry)
		{
			function _gotDirectoryEntry(directoryEntry)
			{
				function fileMoved()
				{
					var url = fileEntry.toURL();
					onSuccess(url);
				}
				fileEntry.copyTo(directoryEntry, to, fileMoved, this._errorHandler);
			}

			this._getDirectoryEntry(this._getDirectory(), _gotDirectoryEntry.bind(this));
		}

		this._getFileEntry(from, _gotFileEntry.bind(this));
	};

	this.removeFile = function (from, onSuccess)
	{
		function _gotFileEntry(fileEntry)
		{
			fileEntry.remove(onSuccess, this._errorHandler);
		}

		this._getFileEntry(from, _gotFileEntry.bind(this));
	};

	this._getFileObject = function (fileName, successHandler)
	{
		function _gotFileEntry(fileEntry)
		{
			fileEntry.file(successHandler.bind(this));
		}

		this._getFileEntry(fileName, _gotFileEntry);
	};

	this._getFileEntry = function (fileName, successHandler)
	{
		var directory = this._getDirectory();
		if (fileName.indexOf("/") !== -1) // If given fileName is absolute
		{
			var parts = fileName.split("/");
			directory = "";
			for (var i = 0; i < parts.length - 1; ++i)
			{
				directory += parts[i] + "/";
			}
			fileName = parts[parts.length - 1];
		}
		function _gotDirectoryEntry(directoryEntry)
		{
			directoryEntry.getFile(fileName, {create: true, exclusive: false}, successHandler.bind(this), this._errorHandler.bind(this));
		}

		this._getDirectoryEntry(directory, _gotDirectoryEntry);
	};

	this._getDirectoryEntry = function (directory, successHandler)
	{
		function _onFileSystemSuccess()
		{
			window.resolveLocalFileSystemURL(directory, successHandler.bind(this))
		}

		function _requestFileSystem()
		{
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, _onFileSystemSuccess.bind(this), this._errorHandler.bind(this));
		}

		_requestFileSystem.call(this);
	};

	this._errorHandler = function (e)
	{
		var msg = '';
		switch (e.code)
		{
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
			case FileError.ENCODING_ERR:
				msg = 'ENCODING_ERR';
				break;
			case FileError.PATH_EXISTS_ERR:
				msg = 'PATH_EXISTS_ERR';
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
		return this._getDirectory();
	};

	this._getDirectory = function ()
	{
		var directory = cordova.file.dataDirectory;
		if (navigator.userAgent.match(/Android/i))
		{
			directory = cordova.file.externalDataDirectory;
		}
		return directory;
	};
});