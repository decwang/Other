#!/usr/bin/env ruby
#
#
require 'fileutils'
require 'pathname'
require_relative 'merge_png_plist'
require_relative 'pause_script'

# 合并所有png和plist
class AllMerge

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

		Dir.glob("**/*.plist") do |plist_name|
			# 忽略粒子系统
			if 0 != plist_name.index("ps/") then
				puts plist_name
				total_count += 1

				png_path = plist_name.sub('.plist', '.png')
				ret = MergePngPlist.merge(png_path, plist_name)
				if ret < 0 then
					puts format("ERROR:%s  ret:%d", plist_name, ret)
					err_count += 1
				elsif ret == 0 then
					chg_count += 1
				end
			end
		end

		puts "总数：" + total_count.to_s() + "  变更：" + chg_count.to_s() + "  失败：" + err_count.to_s()
	end
end

AllMerge.all()
PauseScript.pause()
