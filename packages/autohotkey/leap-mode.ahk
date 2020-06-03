;======================
;SETUP
;======================
isOn := False
width := A_ScreenWidth/2 - 50
height := 0

; Disable Capslock
SetCapsLockState, AlwaysOff

; Match window by substring
SetTitleMatchMode, 2

;======================
;AUTO EXECUTE SECTION
;======================

;noop

;======================
;THREADED SECTION
;======================

; Ctrl + Alt + CapsLock to use Capslock
!^CapsLock::CapsLock


; Usa Capslock to toggle mode 
~*CapsLock::
  UpdateStatus()
	keywait, CapsLock
return

; All time mappings
#If
+Backspace::Send {Del}
^+Backspace::Send ^{Del}

; System-wide leap mode mappings
#If isOn
*i::Up
*k::Down
*j::Left
*l::Right

; Home/End
*u::Home
*o::End

; Page alternative
*[::PgUp
*]::PgDn

; Page (in VS Code, this will be handled differently as paragraph movement)
#If (isOn && !IsInVisualStudioCode())
^i::Send {PgUp}
^k::Send {PgDn}
^+i::Send +{PgUp}
^+k::Send +{PgDn}



;======================
;FUNCTIONS
;======================

IsCapsLockOn()
{
	return GetKeyState("CapsLocK", "P") = 1
}

IsInVisualStudioCode()
{
	return WinActive("Visual Studio Code")
}

UpdateStatus()
{
	global width
	global height
	global isOn

	if (isOn)
	{
		Progress, off
		isOn := False

		ControlSend,,{Ctrl down}{Shift down}{Delete}{Ctrl up}{Shift up},Visual Studio Code
	}		
	else
	{
		Progress, B W120 ZH0 FS8 x%width% y%height% CW5FF9D4 CT000000, LEAP MODE, , LeapStatus
		isOn := True

		ControlSend,,{Ctrl down}{Shift down}{Insert}{Ctrl up}{Shift up},Visual Studio Code
	}
	return
}
