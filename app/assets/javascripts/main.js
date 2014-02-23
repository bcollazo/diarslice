$(document).ready(function() {
	var num_players = parseInt(window.location.pathname.substring(1));
	var current_player = 0;

	var submit_num_players = function() {
		num_players = parseInt($("#num_players_input").val());
		window.location.href = "/"+num_players;
	}

	var activate_player = function(i) {
		$("input").attr("disabled", true);
		$("button").attr("disabled", true);
		$("#player_"+i+" input").attr("disabled", false);
		$("#player_"+i+" button").attr("disabled", false);
		$("#player_"+i+" input").val("");
		$("#player_"+i+" .cantidad").focus();
	}

	var submit_play = function() {
		var valid = true;
		if (valid) {
			current_player = (current_player + 1) % num_players;
			console.log(current_player);
			activate_player(current_player);
		}
	}

	$(".apostar").click(function() {
		submit_play();
	});

	$("#game_panel").hide();
	$("#player_col").hide();
	$("#num_players_input").focus();

	activate_player(0);
	$(".dice-hand").each(function() {
		$(this).effect("shake", parseInt($(this).attr("data-duration")), "fast");
	});

	$("#num_players_input").keypress(function(e) {
		if (e.keyCode == 13) {
			submit_num_players();
		}
	});
	$("#num_players_btn").click(function() {
		submit_num_players();
	});


	$(".cantidad").keypress(function(e) {
		if (e.keyCode == 13) {
			$(this).parent().siblings()[1].children[0].focus();
		}
	});
	$(".numero").keypress(function(e) {
		if (e.keyCode == 13) {
			submit_play();
		}
	});

});
