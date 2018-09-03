#!/usr/bin/env ruby
#

require 'fileutils'
require 'pathname'
require_relative 'plist2txt'
require_relative 'pause_script'

# 动画合图集，并转化plist
class AnimatePacker

	def self.do_pack(path, format, plist_file, sheet_file, pngquant_on, options)
		system "TexturePacker --format cocos2d --texture-format #{format} --opt RGBA8888 --dither-none-nn "\
		"--max-size 2048 --size-constraints NPOT --data #{plist_file} --sheet #{sheet_file} #{path} #{options}"

		system "pngquanti --speed 1 --ext .png --force -- #{sheet_file}" if pngquant_on

		Plist2Text.plist_2_text(plist_file)
	end
	
	def self.pack(pngquant_on, options = "")
		cur_path = Dir.getwd
		dest_dir = cur_path.sub('tools/animate/', 'runtime/assets/res/')
		if cur_path == dest_dir then
			puts "目录不正确"
			return
		end

		plist_file = dest_dir + ".plist"
		sheet_file = dest_dir + ".png"

		do_pack(cur_path, 'png', plist_file, sheet_file, pngquant_on, options)
	end
end

