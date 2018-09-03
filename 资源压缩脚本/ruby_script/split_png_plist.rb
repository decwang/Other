#!/usr/bin/env ruby
#

require 'fileutils'
require 'pathname'

# 拆分png和plist
class SplitPngPlist
	def self.split(png_path)
		png_size = File.size?(png_path)
		if png_size > 0 then
			f_png = File.open(png_path, "r")

			f_png.seek(-4, IO::SEEK_END)
			if f_png.sysread(4) != "____" then
				return
			end

			f_png.seek(-12, IO::SEEK_END)
			plist_len = f_png.sysread(8).to_i(16)

			f_png.seek(-(plist_len + 12), IO::SEEK_END)
			plist_buf = f_png.sysread(plist_len)

			f_plist = File.open(png_path.sub('.png', '.plist'), "w")
			f_plist.syswrite(plist_buf)
			f_plist.close()

			f_png.reopen(png_path, "rb")
			png_buf = f_png.sysread(png_size - plist_len - 12)

			f_png.reopen(png_path, "wb")
			f_png.syswrite(png_buf)
			f_png.close()
		end
	end
end

