#!/usr/bin/env ruby
#
#

# windows系统加暂停
class PauseScript
	def self.pause()
		host_os = RbConfig::CONFIG['host_os']
		case host_os
		when /mswin|msys|mingw|cygwin|bccwin|wince|emc/
			system("PAUSE")
		end
	end
end

