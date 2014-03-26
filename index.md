---
layout: home
---
<div id="loading">
    <div class="spinner-bounce-circle">
        <div></div>
        <div></div>
    </div>
</div>
<div class="container wrapper" ng-controller="myDraft">
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
			<textarea ng-model="selected_draft.content" id="inputor" class="inputor" placeholder="Write Here" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>
	    </div>
	</div>
	<div id="rightbar">
		<div class="logoright">
			<div class="avrosprite logo"></div>
		</div>
		<div class="vason txtright txttop">
			This project is an attempt to port Avro Phonetic to web
		</div>
        {% raw %}
        <div class="draft vason">
            <div class="centerme drafttitle">
                <span>Your Drafts</span><br>
                <span id="insertDraft" class="btn" ng-click="on_add_draft()"><span class="icon-plus tapbtn"></span>Add new Draft</span>
            </div>
            <ul>
                <li ng-class="{active: selected_draft == draft}" ng-repeat="draft in drafts | orderBy:'date':true">                    
                    <div class="libutton">
                        <span class="btn editbtn icon-pencil draft_edit"></span>
                        <span class="btn delbtn icon-remove" ng-click="on_del_draft(draft)"></span>
                    </div>
                    <a href="#" ng-click="on_select_draft(draft)">
                        <input class="title draft_name" type="text" ng-model="draft.name" readonly>
                        <small><time class="timeago" datetime="{{draft.date.toISOString()}}">{{draft.date.toUTCString()}}</time></small>
                    </a>
                </li>
            </ul>
            <br>
            <div class="centerme draftbody">
                <select ng-model="selected_draft"
                        ng-options="draft.name for draft in drafts | orderBy:'date':true">
                </select>
                <div id="mobilebtn">
                    <span id="mobEditBtn" class="icon-pencil tapbtn" ng-click="on_edit_draft()"></span>
                    <span id="mobDelBtn"  class="icon-remove tapbtn" ng-click="on_del_draft()"></span>
                </div>
            </div>
        </div>
        {% endraw %}
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