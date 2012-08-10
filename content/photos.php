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

  pre($feed);

  function pre($var, $kill = false) {
    echo '<pre>';
    if(is_array($var) || is_object($var)) {
      print_r($var);
    } else {
      print_r(htmlentities($var));
    }
    echo '</pre>';

    if($kill) {
      exit();
    }
  }
  ?>

%p
  %a{:href => 'http://klanoma.tumblr.com', :target => '_blank'} See More