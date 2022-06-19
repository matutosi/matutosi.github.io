/********************************************************************************

	SYNCER 〜 知識、感動をみんなと同期(Sync)するブログ

	* 配布場所
	https://syncer.jp/how-to-use-geolocation-api

	* 最終更新日時
	2015/08/16 01:16

	* 作者
	あらゆ

	** 連絡先
	Twitter: https://twitter.com/arayutw
	Facebook: https://www.facebook.com/arayutw
	Google+: https://plus.google.com/114918692417332410369/
	E-mail: info@syncer.jp

	※ バグ、不具合の報告、提案、ご要望など、お待ちしております。
	※ 申し訳ありませんが、ご利用者様、個々の環境における問題はサポートしていません。

********************************************************************************/


// グローバル変数
var syncerWatchPosition = {
	count: 0 ,
	lastTime: 0 ,
	map: null ,
	marker: null ,
} ;

// 成功した時の関数
function successFunc( position )
{
	// データの更新
	++syncerWatchPosition.count ;					// 処理回数
	var nowTime = ~~( new Date() / 1000 ) ;	// UNIX Timestamp

	// 前回の書き出しから3秒以上経過していたら描写
	// 毎回HTMLに書き出していると、ブラウザがフリーズするため
	if( (syncerWatchPosition.lastTime + 3) > nowTime )
	{
		return false ;
	}

	// 前回の時間を更新
	syncerWatchPosition.lastTime = nowTime ;

	// HTMLに書き出し
	document.getElementById( 'result' ).innerHTML = '<dt>緯度</dt><dd>' + position.coords.latitude + '</dd><dt>経度</dt><dd>' + position.coords.longitude + '</dd><dt>高度</dt><dd>' + position.coords.altitude + '</dd><dt>速度</dt><dd>' + position.coords.speed + '</dd><dt>実行回数</dt><dd>' + syncerWatchPosition.count + '回</dd>' ;

	// 位置情報
	var latlng = new google.maps.LatLng( position.coords.latitude , position.coords.longitude ) ;

	// Google Mapsに書き出し
	if( syncerWatchPosition.map == null )
	{
		// 地図の新規出力
		syncerWatchPosition.map = new google.maps.Map( document.getElementById( 'map-canvas' ) , {
			zoom: 15 ,				// ズーム値
			center: latlng ,		// 中心座標 [latlng]
		} ) ;

		// マーカーの新規出力
		syncerWatchPosition.marker = new google.maps.Marker( {
			map: syncerWatchPosition.map ,
			position: latlng ,
		} ) ;
	}
	else
	{
		// 地図の中心を変更
		syncerWatchPosition.map.setCenter( latlng ) ;

		// マーカーの場所を変更
		syncerWatchPosition.marker.setPosition( latlng ) ;
	}
}

// 失敗した時の関数
function errorFunc( error )
{
	// エラーコードのメッセージを定義
	var errorMessage = {
		0: "原因不明のエラーが発生しました…。" ,
		1: "位置情報の取得が許可されませんでした…。" ,
		2: "電波状況などで位置情報が取得できませんでした…。" ,
		3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。" ,
	} ;

	// エラーコードに合わせたエラー内容を表示
	alert( errorMessage[error.code] ) ;
}

// オプション・オブジェクト
var optionObj = {
	"enableHighAccuracy": false ,
	"timeout": 1000000 ,
	"maximumAge": 0 ,
} ;

// 現在位置を取得する
navigator.geolocation.watchPosition( successFunc , errorFunc , optionObj ) ;
