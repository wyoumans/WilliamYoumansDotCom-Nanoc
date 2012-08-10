---
browser_title: "| Photos"
url: photos
---

%h1
  Photos

:plain
  <?php

  $doc = new DOMDocument();
  $doc->load('http://klanoma.tumblr.com/rss/');
  $feed = array();
  foreach ($doc->getElementsByTagName('item') as $node) {
    $feed[] = array(
      'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
      'desc' => $node->getElementsByTagName('description')->item(0)->nodeValue,
      'link' => $node->getElementsByTagName('link')->item(0)->nodeValue,
    );
  }

  var_dump($feed);
  ?>