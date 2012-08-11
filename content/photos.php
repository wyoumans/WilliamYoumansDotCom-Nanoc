---
browser_title: "| Photos"
url: photos
---

%h1
  Photos

:plain
  <?php
  date_default_timezone_set('America/Denver');
  $doc = new DOMDocument();
  $doc->load('http://klanoma.tumblr.com/rss/');
  $count = 0;
  ?>
  <?php foreach ($doc->getElementsByTagName('item') as $node): ?>
    <div class="post">
      <h2>
        <?php echo date('m/d/Y', strtotime($node->getElementsByTagName('pubDate')->item(0)->nodeValue)) ?>
      </h2>
      <p>
        <?php echo $node->getElementsByTagName('description')->item(0)->nodeValue ?>
      </p>
    </div>
    <?php $count++; ?>
    <?php if($count > 5) break; ?>
  <?php endforeach; ?>

.see_more
  %a{:href => 'http://klanoma.tumblr.com', :target => '_blank'} See More