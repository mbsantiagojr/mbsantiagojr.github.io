<?
	ob_start();
	header("Cache-Control: no-cache, must-revalidate");

	$cont = $_GET['cont'];
	$cont.=".php";
	 if(eregi("http|www|ftp|.dat|.txt|.gif|wget|../", $cont)){
	  echo "Página não encontrada";
	  exit;
	 }
	if (!file_exists($cont)) $cont = "home.php";
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>

  <!--
  /*************************************************************/
   * Data           : 09/2015                       		 
   * @copyright     : Alfaiataria Digital
   * Layout         : Alfaiataria Digital 
   * Development    : MB Santiago Jr.  
   * Módulo         : Home Page - Teste   	    	    		 
   *************************************************************/
  -->


  <meta charset="UTF-8" />
  <meta name="dc.title" content="DecorSoup" />
  <meta name="dc.creator" content="MB Santiago Jr." /> 
  <meta name="language" content="pt-br">
  <meta name="description" content="Teste Para Vaga Front-Dev Jt.">
  <meta name="keywords" content="Teste + Entrevista + FronteEnd">
  <meta name="robots" content="index,follow">
  <meta name="author" content="MB Santiago Jr.">
  <meta name="contact" content="mbsantiagojr@gmail.com">
  <meta name="viewport" content="width=device-width,initial-scale=1">


  <link rel="shortcut icon" href="favicon.ico" />
  <title>DECORSOUP | Monte o Seu Look</title>
  
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic,700,700italic,800' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,300italic,700' rel='stylesheet' type='text/css'>  
  <link href="css/reset.css?<?php echo date('l jS \of F Y h:i:s A'); ?>" rel="stylesheet" />
  <link href="css/estilos.css?<?php echo date('l jS \of F Y h:i:s A'); ?>" rel="stylesheet" />
  <link href="css/media-queries.css?<?php echo date('l jS \of F Y h:i:s A'); ?>" rel="stylesheet" />
  
</head>

<body>

<header>

  <section id="cabecalho" class="">
   
    <a href="#">
      <h1>DecorSoup</h1>
    </a>
    
    <div class="perfil">
       <div class="login">
            <span>Olá, <strong>Cliente</strong>.</span>
            <a href="">Login</a>
       </div>
       <div class="cadastro">
            <span>Quer montar looks?</span>
            <a href="">Cadastre-se</a>
       </div>
    </div>
    
  </section>
  
  <section class="menu">
          <nav class="" role="navigation">
      <ul class="">
        <li><a href="">monte seu look</a></li>
        <li><a href="">marcas</a></li>
        <li><a href="">looks</a></li>
        <li><a href="">sobre</a></li>
      </ul> 
    </nav>   
    
    <div class="busca">

        <form action="http://google.com/search" id="form-busca">
            <input type="text" name="q" id="q">
            <input type="submit" class="lupa">
        </form>	

    </div>
  </section>

</header>

