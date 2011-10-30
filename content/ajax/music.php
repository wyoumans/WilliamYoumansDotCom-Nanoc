<?php

require( 'libs/lastfmapi/lastfmapi.php');

$authVars = array(
  'apiKey' => '1f32fa7ac202a9fd6f397586f544b3e3',
  'secret' => '472be5ec3e397c2b07ca37204fffc0ae',
  'username' => 'gotwilly'
);
$config = array(
  'enabled' => true,
  'path' => 'libs/lastfmapi/',
  'cache_length' => 1800
);
  
$auth = new lastfmApiAuth('setsession', $authVars);
  
$apiClass = new lastfmApi();
$userClass = $apiClass->getPackage($auth, 'user', $config);
$userCred = array(
  'user' => 'gotwilly',
  'period' => '7day'    
);

if($tracks = $userClass->getRecentTracks($userCred)){
  $count = 0;
  $secondsAgo=0;
  $timeElapsed = "";
  foreach ( $tracks as $track ) {
    $count++;
    if (!$track['nowplaying']){
      $secondsAgo = time()-$track['date'];
      if ($secondsAgo <60){ $timeElapsed = $secondsAgo." seconds ago"; } 
      elseif ($secondsAgo >=60 && $secondsAgo <120){ $timeElapsed = floor($secondsAgo/60)." minute ago"; }
      elseif ($secondsAgo >=120 && $secondsAgo <3600){ $timeElapsed = floor($secondsAgo/60)." minutes ago"; }
      elseif ($secondsAgo >=3600 && $secondsAgo <7200){ $timeElapsed = floor($secondsAgo/60/60)." hour ago"; }
      elseif ($secondsAgo >=7200 && $secondsAgo <86400){ $timeElapsed = floor($secondsAgo/60/60)." hours ago"; }
      elseif ($secondsAgo >=86400 && $secondsAgo <172800){ $timeElapsed = floor($secondsAgo/60/60/24)." days ago"; }
      elseif ($secondsAgo >=172800 && $secondsAgo <864000){ $timeElapsed = floor($secondsAgo/60/60/24)." days ago"; }
      else { $timeElapsed = date("M d, Y g:ia", $track['date']); }
    }
    if (strlen($track['name']) >=20){$track['name'] = substr($track['name'], 0, 20)."...";}
?>
    echo "<table cellpadding=0 cellspacing=0 border=0>";
    echo "<tr><td><img style='padding-right:3px; width:70px; height:70px' src='".$track['images']['medium']."' alt=''></td><td>";
    echo "<span style='font-size:10px;'><a href='".$track['url']."'>".$track['name']."</a><br >by ".$track['artist']['name']."<br >";
    if ($track['nowplaying']!=1){echo $timeElapsed;} else { echo "<img style='vertical-align:middle;' src='http://cdn.last.fm/flatness/global/icon_eq.gif' alt='equilizer'> Listening Now</span>";}
    echo "<br ><span style='font-size:10px; margin-left:70px;'><a href='?p=music'>see more</a></span>";
    echo "</td></tr></table>";
<?php
    Break;
  }
} else {
  echo 'None';
}

?>