#!/usr/bin/env ruby
#
#
require 'fileutils'
require 'pathname'
require 'plist'
require_relative 'plist2txt'
require_relative 'pause_script'

# 转换所有动画plist
class AnimatePlist

	def self.all()
		path = "../../runtime/assets/res"

		if !File::exist?(path) then
			puts "目录不存在，请检查脚本是否放错位置"
			return
		end

		Dir::chdir(path)

		total_count = 0
		chg_count = 0
		err_count = 0

		Dir.glob("**/*.plist") do |file_name|
			# 忽略粒子系统
			if 0 != file_name.index("ps/") then
				puts file_name
				total_count += 1
				ret = Plist2Text.plist_2_text(file_name)
				if ret < 0 then
					puts format("ERROR:%s  ret:%d", file_name, ret)
					err_count += 1
				elsif ret == 0 then
					chg_count += 1
				end
			end
		end

		puts "总数：" + total_count.to_s() + "  变更：" + chg_count.to_s() + "  失败：" + err_count.to_s()
	end
end

AnimatePlist.all()
PauseScript.pause()
