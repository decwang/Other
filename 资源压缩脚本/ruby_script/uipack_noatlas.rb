#!/usr/bin/env ruby
#
require 'fileutils'
require 'pathname'
require_relative 'pause_script'

class UIPacker
	def self.pack()
		temp_path = Dir.getwd
		dest_dir = temp_path.sub('tools/uieditor/ui_res/', 'runtime/assets/res/xui/')
		if temp_path == dest_dir then
			puts "目录不正确"
			return
		end

		puts temp_path
		puts dest_dir

		if File::exist?(dest_dir) then
			FileUtils.remove_dir dest_dir
		end
		FileUtils.mkdir dest_dir

		Dir.glob("**/*.png") do |file_name|
			name = Pathname.new(file_name).basename.to_s
			dest_path = dest_dir + '/' + name
			puts dest_path
			
			FileUtils.cp file_name, dest_path
		end
		
		file_list = dest_dir + '/' + '*.png'
		puts "图片压缩开始，请勿退出！"
		system "pngquanti --speed 1 --ext .png --force #{file_list}"
		puts "图片压缩结束！"
	end
end

UIPacker.pack()
PauseScript.pause()
