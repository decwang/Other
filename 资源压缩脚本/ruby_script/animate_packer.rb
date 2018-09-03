#!/usr/bin/env ruby
#

require 'fileutils'
require 'pathname'
require_relative 'plist2txt'
require_relative 'pause_script'
require_relative 'merge_png_plist'

# 动画合图集，并转化plist
class AnimatePacker

	def self.do_pack(path, format, plist_file, sheet_file, pngquant_on, options)
		system "TexturePacker --format cocos2d --texture-format #{format} --opt RGBA8888 --dither-none-nn "\
		"--max-size 2048 --size-constraints NPOT --data #{plist_file} --sheet #{sheet_file} #{path} #{options}"

		system "pngquanti --speed 1 --ext .png --force -- #{sheet_file}" if pngquant_on

		Plist2Text.plist_2_text(plist_file)
		MergePngPlist.merge(sheet_file, plist_file)
	end
	
	def self.pack(pngquant_on, options = "", path_1)
		cur_path = path_1
		
		dest_dir = cur_path.sub('tools/animate/', 'runtime/assets/res/')
		puts dest_dir

		if cur_path == dest_dir then
			puts "目录不正确"
			return
		end

		plist1_file = dest_dir + ".plist"
		plist_file = plist1_file.sub('/.plist', '.plist') 
		
		sheet1_file = dest_dir + ".png"
		sheet_file = sheet1_file.sub('/.png', '.png') 

		do_pack(cur_path, 'png', plist_file, sheet_file, pngquant_on, options)
	end
end

