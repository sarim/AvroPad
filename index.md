---
layout: home
---

<div class="container wrapper">
	<div id="leftbar" class="leftbar">
		<div id="indicator">
			<span id="mobilehint" class="vason">Tap Here or Swype Anywhere<br>to toggle language</span>
			<div class="avrosprite indicator-bare"></div>
			<div class="avrosprite indicator-glow"></div>
		</div>
		<div class="logoleft">
			<div class="avrosprite logo"></div>
		</div>
		<div class="vason bottomfloat leftbar">
			<span>Ctrl + . (dot)</span><br>
			<small>to switch mode</small>
		</div>
	</div>
	<div id="middle">
	    <div id="main">
			<textarea id="inputor" class="inputor" placeholder="Write Here" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
	    </div>
	</div>
	<div id="rightbar">
		<div class="logoright">
			<div class="avrosprite logo"></div>
		</div>
		<div class="vason txtright txttop">
			This project is an attempt to port Avro Phonetic to web
		</div>
		<div class="draft vason">
			<span>Autosaved Drafts</span>
			<span id="insertDraft" class="btn icon-plus"> </span>
			<span id="saveDraft" class="btn icon-download"> </span>
			<ul>
			</ul>
			<select>
			</select>
		</div>
		<div class="vason share">
			Share the Love <br>
			<div class="sharebuttons">
				<a href="#" class="facebook"><span class="icon-facebook"></span></a>
				<a href="#" class="twitter"><span class="icon-twitter"></span></a>
				<a href="#" class="gplus"><span class="icon-google-plus"></span></a>
			</div>
		</div>
		<div class="vason bottomfloat txtright">
			(c) OmicronLab 2013
		</div>
	</div>
</div>
{% include google_analytics.html %}
{% include javascript.html %}