#!/usr/bin/env ruby
#
#
require 'plist'

class Plist2Lua
    def self.plist_2_lua(plist)
        h = Plist::parse_xml(plist)

        l = {}
        l['file_name'] = "ui/" + h['metadata']['textureFileName']

        i = 1
        l['frame_list'] = {}
        h['frames'].each do |k,v|
            t = {}

            t['name'] = k

            f = v['frame'].delete!('{').delete!('}').split(',')
            t['frame'] = { 'x' => f[0], 'y' => f[1], 'width' => f[2], 'height' => f[3] }

            o = v['offset'].delete!('{').delete!('}').split(',')
            t['offset'] = { 'x' => o[0], 'y' => o[1] }

            t['rotate'] = v['rotated']

            #cr = v['sourceColorRect'].delete!('{').delete!('}').split(',')
            #t['color_rect'] = { 'x' => cr[0], 'y' => cr[1], 'width' => cr[2], 'height' => cr[3] }

            ss = v['sourceSize'].delete!('{').delete!('}').split(',')
            t['src_size'] = { 'width' => ss[0], 'height' => ss[1] }

            l['frame_list']["[#{i}]"] = t
            i += 1
        end

        return  "Config.sprite_plist_auto=Config.sprite_plist_auto or {}\nConfig.sprite_plist_auto[\"ui/#{plist}\"]=" + l.to_s().delete!('"').delete!('>').gsub!(/=ui\//, '="ui/').gsub!(/\.png,/, '.png",').gsub!(/\{file_name=/, "{\n\tfile_name=").gsub!(/, frame_list=\{/, ",\n\tframe_list={").gsub!(/\[(\d+)\]=\{name=/, "\n\t\t[\\1]={name=\"").gsub!(/}}}}/, "}\n\t\t}\n\t}\n}")
    end
end

