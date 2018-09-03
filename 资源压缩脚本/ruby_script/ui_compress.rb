#!/usr/bin/env ruby
#

require 'fileutils'
require 'pathname'
require_relative 'pause_script'

# 仅压缩不合图集
class UICompress
	def self.compress()
		temp_path = Dir.getwd
		dest_dir = temp_path.sub('tools/uieditor/ui_res/', 'runtime/assets/res/ui/')
		if temp_path == dest_dir then
			puts "目录不正确"
			return
		end

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
		puts "图片压缩中，请勿退出 . . ."
		system "pngquanti --speed 1 --ext .png --force #{file_list}"
		puts "图片压缩结束！"
	end
end
