' Create shortcuts
' Usage: cscript.exe <lnkPath> <exePath> <exeArgs>

If WScript.Arguments.Count < 3 Then
  WScript.Echo "3 argumennts is required"
  WScript.Quit(1)
End If

lnkPath = WScript.Arguments(0)
exePath = WScript.Arguments(1)
' VBScript command line escape double quotes
' https://stackoverflow.com/questions/6512985/
exeArgs = Unescape(WScript.Arguments(2))

Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FileExists(exePath) Then
  WScript.Echo "Not found: " & exePath
  WScript.Quit(1)
End If

dir = fso.GetParentFolderName(lnkPath)
If Not fso.FolderExists(dir) Then
  fso.CreateFolder(dir)
End If

Sub CreateShortcut()
  Set WshShell = WScript.createObject("WScript.Shell")
  Set lnk = WshShell.CreateShortcut(lnkPath)
  lnk.TargetPath = exePath
  lnk.Arguments = exeArgs
  lnk.Save
End Sub

CreateShortcut
