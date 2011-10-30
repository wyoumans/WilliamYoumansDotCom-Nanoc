# lib/default.rb

include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::Capturing
include Nanoc3::Helpers::Filtering
include Nanoc3::Helpers::HTMLEscape
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Text
include Nanoc3::Helpers::XMLSitemap

class Nanoc3::Item
  def content(opts = {})
    opts[:rep] ||= :default
    opts[:snapshot] ||= :last
    reps.find { |r| r.name == opts[:rep] }.content_at_snapshot(opts[:snapshot])
  end

  def name
    identifier.split("/").last 
  end
end

$devserver = false

if $devserver
  $random = '?' + rand(500000).to_s
else
  $random = ''
end