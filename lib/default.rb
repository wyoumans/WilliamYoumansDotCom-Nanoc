# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

# To prevent cacheing the js and css on dev server
# append a random query string to each path
$random = '?' + rand(500000).to_s;

# For output used on the TV
#$random = '';