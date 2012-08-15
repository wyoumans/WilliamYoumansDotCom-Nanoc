---
browser_title: "| Photos"
url: photos
meta_description: William Youmans posts pictures from his life daily.
---

%h1
  Photos

<?php
date_default_timezone_set('America/Denver');
$doc = new DOMDocument();
$doc->load('http://klanoma.tumblr.com/rss/');
$count = 0;
?>
<?php foreach ($doc->getElementsByTagName('item') as $node): ?>

.post
  %h2
    %span <?php echo date('m/d/Y', strtotime($node->getElementsByTagName('pubDate')->item(0)->nodeValue)) ?>

  %p <?php echo $node->getElementsByTagName('description')->item(0)->nodeValue ?>

<?php if($count++ > 5) break; ?>
<?php endforeach; ?>


.post
  %a{:href => 'http://klanoma.tumblr.com', :target => '_blank'} See More