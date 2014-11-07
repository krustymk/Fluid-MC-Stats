var liveticker = {
	config: {
		interval: 10,
		url:      ''
	},
	players: {},
	utils: {},
	onlinePlayers: {}
};

liveticker.init = (function(){
	$(document).ready(function(){
		liveticker.item = $('#live-ticker');
		
		liveticker.update();
	});
}());

liveticker.update = function(){
	$.ajax(
		liveticker.config.url,
		{
			cache:    false,
			dataType: "json",
			success:  function(data, textStatus, jqXHR){
				liveticker.item.find('tr').addClass('old');

				var online = 0;
				$(data).each(function(index, data){
					if (liveticker.players[data.player_id] !== undefined) {
						var blockdiff = 0;
						
						if (liveticker.players[data.player_id].traveled !== data.traveled) {
							blockdiff = (data.traveled - liveticker.players[data.player_id].traveled);
							blockdiff = parseInt(blockdiff, 10);
							
							$row = $('<tr />');
							$row.append('<td>' + data.name + '</td>');
							$row.append('<td>moved ' + blockdiff + ' blocks</td>');
							liveticker.item.prepend($row);
						}
					}
					
					if (liveticker.utils.isOnline(data) === true) {
						online++;
						
						// Player is online, check if he was offline.
						if (liveticker.onlinePlayers[data.player_id] === undefined) {
							$row = $('<tr />');
							$row.append('<td>' + data.name + '</td>');
							$row.append('<td>came online</td>');
							liveticker.item.prepend($row);
							
							liveticker.onlinePlayers[data.player_id] = true;
						}
					} else {
						// Player is offline, check if he was online.
						if (liveticker.onlinePlayers[data.player_id] !== undefined) {
							$row = $('<tr />');
							$row.append('<td>' + data.name + '</td>');
							$row.append('<td>went offline</td>');
							liveticker.item.prepend($row);
							
							liveticker.onlinePlayers[data.player_id] = undefined;
						}
					}
					
					liveticker.players[data.player_id] = data;
				});
				
				if (online === 0) {
					$row = $('<tr />');
					$row.append('<td colspan="2">Currently there is no one playing on this server.</td>');
					liveticker.item.prepend($row);
				}
				
				liveticker.schedule();
			},
			error: function(jqXHR, textStatus, errorThrown){
				$row = $('<tr />');
				
				$row.append('<td colspan="2">There was an problem while loading the data. Please try again later.</td>');
				
				liveticker.item.prepend($row);
			}
		}
	);
};

liveticker.schedule = function(){
	setTimeout(
		liveticker.update,
		liveticker.config.interval * 1000
	);
};

liveticker.utils.isOnline = function (playerdata) {
	ret = false;
	
	var lastJoined = new Date(playerdata.lastjoin.replace('-', '/'));
	var lastLeft   = new Date(playerdata.lastleave.replace('-', '/'));
	
	if (lastLeft < lastJoined) {
		ret = true;
	}
	
	return ret;
};