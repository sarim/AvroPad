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
			<div class="centerme drafttitle">
				<span>Autosaved Drafts</span>
				<span id="insertDraft" class="btn icon-plus tapbtn"></span>
				<span id="saveDraft" class="btn icon-download tapbtn"></span>
			</div>
			<ul>
			</ul>
			<br>
			<div class="centerme draftbody">
				<select>
				</select>
				<div id="mobilebtn">
					<span id="mobEditBtn" class="icon-pencil tapbtn"></span>
					<span id="mobViewBtn" class="icon-rocket tapbtn"></span>
					<span id="mobDelBtn"  class="icon-remove tapbtn"></span>
				</div>
			</div>
		</div>
		<div class="vason share">
			Share the Love <br>
			{% include share.html %}
			<span><a href="privacy.html">Privacy Policy</a></span>
		</div>
		<div class="vason bottomfloat txtright">
			<a href="http://omicronlab.com">OmicronLab 2013</a>
		</div>
	</div>
</div>
{% include google_analytics.html %}
{% include javascript.html %}