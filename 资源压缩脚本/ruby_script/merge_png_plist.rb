#!/usr/bin/env ruby
#

require 'fileutils'
require 'pathname'

# 合并png和plist
class MergePngPlist
	def self.merge(png_path, plist_path)
		if not File::exist?(png_path) then
			File.delete(plist_path)
			return -2
		end
		png_size = File.size?(png_path)
		plist_size = File.size?(plist_path)
		if png_size <= 0 or plist_size <= 0 then
			return -1
		end

		f_png = File.open(png_path, "r+")

		f_png.seek(-4, IO::SEEK_END)
		if f_png.sysread(4) == "____" then
			File.delete(plist_path)
			return 1
		end

		f_plist = File.open(plist_path, "r")
		f_png.syswrite(f_plist.sysread(plist_size))
		f_png.syswrite(format("%08x____", plist_size))

		f_png.close()
		f_plist.close()
		File.delete(plist_path)

		return 0
	end
end
