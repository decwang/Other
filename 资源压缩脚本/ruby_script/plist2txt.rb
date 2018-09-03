#!/usr/bin/env ruby
#
#
require 'fileutils'
require 'pathname'
require 'plist'

# 本脚本将动画plist转成自定义文本格式，加快读取、解析速度
class Plist2Text

	def self.plist_2_text(file_name)
		temp_file = File.open(file_name)
		if nil == temp_file then
			return -1
		end

		first_line = temp_file.gets
		temp_file.close()

		if "path" == first_line[0, 4] then
			return 1
		end

		h = Plist::parse_xml(file_name)
		if nil == h then
			puts "error:" + file_name
			return -2
		end

		file_text = 'path=' + h['metadata']['textureFileName']+"\n"
		h['frames'].each do |k,v|
			f = v['frame'].delete!('{').delete!('}').split(',')
			o = v['offset'].delete!('{').delete!('}').split(',')
			s = v['sourceSize'].delete!('{').delete!('}').split(',')
			r = "0"
			if v['rotated'].to_s() == "true" then
				r = "1"
			end

			file_text += k.to_s()+'|'+f[0]+'|'+f[1]+'|'+f[2]+'|'+f[3]+'|'+o[0]+'|'+ o[1]+'|'+s[0]+'|'+s[1]+'|'+r+"\n"
		end

		File.open(file_name, 'w') { |file| file.write(file_text) }
		return 0
	end
end
