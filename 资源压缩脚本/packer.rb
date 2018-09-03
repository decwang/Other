#!/usr/bin/env ruby
#
require 'fileutils'
require 'pathname'
# require_relative '../ruby_script/plist2txt'
require_relative '../ruby_script/merge_png_plist'

class UIPacker

	def self.do_pack(path, format, data_file, sheet_file, prefix, pngquant_on, options)
		system "TexturePacker --format cocos2d --texture-format #{format} --opt RGBA8888 --dither-none-nn "\
		"--size-constraints NPOT #{options} --data #{data_file} --sheet #{sheet_file} #{path}"

		system "pngquanti --speed 1 --ext .png --force -- #{sheet_file}" if pngquant_on

		text = File.read(data_file)
		text.gsub!(/<key>(.*)\.png<\/key>/, "<key>#{prefix}/\\1.png</key>")
		
		# File.open(data_file, 'w') { |file| file.write(text) }

		# Plist2Text.plist_2_text(data_file)
		# MergePngPlist.merge(sheet_file, data_file)
	end
	
	def self.pack(pngquant_on, options = "")
		format='png'

		temp_path=Dir.getwd
		name=Pathname.new(temp_path).basename.to_s

		prefix=temp_path.sub(/.*\/ui_res/, 'res/xui')
		suffix="pvr2ccz" == format ? "pvr.ccz" : "png"
		puts name
		temp_data_file="#{temp_path}/#{name}.plist"
		temp_sheet_file="#{temp_path}/#{name}.#{suffix}"

		data_file=temp_data_file.sub(/tools\/uieditor\/ui_res\/.*\//, 'runtime/assets/res/xui/')
		sheet_file=temp_sheet_file.sub(/tools\/uieditor\/ui_res\/.*\//, 'runtime/assets/res/xui/')
		puts data_file
		puts sheet_file

		File.unlink(temp_data_file) if File.exist?(temp_data_file)
		File.unlink(temp_sheet_file) if File.exist?(temp_sheet_file)

		do_pack(temp_path, format, temp_data_file, temp_sheet_file, prefix, pngquant_on, options)

		FileUtils.mv(temp_sheet_file, sheet_file, :force => true) if File.exist?(temp_sheet_file)
		FileUtils.mv(temp_data_file, data_file, :force => true) if File.exist?(temp_data_file)
	end
end
