<?php 

function updateFile($name, $content){
    echo($name);
    $myfile = fopen($name, "w") or die("Unable to open file!");
    fwrite($myfile, $content);
    fclose($myfile);
}
// PUT THE POST VARIABLES IN
$pass = updateFile($_POST['name'], $_POST['content']);

?>