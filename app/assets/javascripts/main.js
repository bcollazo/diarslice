var DIE_NAME = {1: "DAGA", 2: "DONA", 3: "TREN", 4: "CUADRA", 5: "QUINA", 6: "CENA"}
var DICE_NAMES = {1: "DAGAS", 2: "DONAS", 3: "TRENES", 4: "CUADRAS", 5: "QUINAS", 6: "CENAS"}

$(document).ready(function() {
	// ===== Index
	var num_players = parseInt(window.location.pathname.substring(1));
	var current_player = -1;
	var current_play = [0, 0];
	var result = 0;

	var submit_num_players = function() {
		num_players = parseInt($("#num_players_input").val());
		window.location.href = "/"+num_players;
	}

	$("#num_players_input").focus();
	$("#num_players_input").keypress(function(e) {
		if (e.keyCode == 13) {
			submit_num_players();
		}
	});
	$("#num_players_btn").click(function() {
		submit_num_players();
	});


	// ===== Play
	var activate_player = function(i) {
		$(".player_col input").attr("disabled", true);
		$(".player_col button").attr("disabled", true);
		$("#player_"+i+" input").attr("disabled", false);
		$("#player_"+i+" button").attr("disabled", false);
		$("#player_"+i+" input").val("");
		$("#player_"+i+" .cantidad").focus();
	}

	var submit_play = function() {
		var cantidad = parseInt($("#player_"+current_player+" .cantidad").val());
		var numero = parseInt($("#player_"+current_player+" .numero").val());
		var play = [cantidad, numero];

		// Check Validity
		var numbers = cantidad > 0 && numero > 0;
		var dice = numero > 0 && numero < 7;
		var a = (numero >= current_play[1] && cantidad > current_play[0]); //sube cantidad
		var b = (cantidad >= current_play[0] && numero > current_play[1]); //sube numero
		var c = (numero == 1 && cantidad >= Math.ceil(current_play[0]/2));
		if (current_play[1] != 1) {
			var bigger = a || b || c;
		} else {
			var bigger = (numero != 1 && cantidad >= 2*current_play[0] + 1) ||
							(numero == 1 && cantidad > current_play[0]);
		}
		var valid = numbers && dice && bigger;

		if (valid) {
			current_play = play;
			var text = current_play[0] == 1 ? cantidad+" "+DIE_NAME[numero]: cantidad+" "+DICE_NAMES[numero];
			console.log(current_play[0]);
			$("#current_play").text(text);
			current_player = (current_player + 1) % num_players;
			activate_player(current_player);
		}
	}

	var reveal_dice = function() {
		$(".die").each(function(e) {
			$(this).html("<p class='lead text-center'>"+Math.round(Math.random()*6)+"</p>");
		});
		$(".die").effect("pulsate", 500);
	};

	var count_good_dice = function() {
		var good_dice = 0;
		$(".die").each(function() {
			var val = parseInt($(this).text());
			if (val == 1 || val == current_play[1]) {
				good_dice += 1;
				$(this).css("background-color", "rgba(255,255,153)");
			}
		});
		return good_dice;
	}

	var calzar = function() {
		reveal_dice();
		var good_dice = count_good_dice();
		if (current_play[0] == good_dice) {
			$("#result").text("GANASTES");
			$("#round_result").show();
		} else {
			$($("#player_"+current_player+" .die")[0]).animate({backgroundColor: "#FF0000"}, 500);
			$($("#player_"+current_player+" .die")[0]).animate({backgroundColor: "#FFFFFF"}, 500);
			$($("#player_"+current_player+" .die")[0]).animate({backgroundColor: "#FF0000"}, 500);
			$($("#player_"+current_player+" .die")[0]).animate({backgroundColor: "#FFFFFF"}, 500);
			$($("#player_"+current_player+" .die")[0]).animate({backgroundColor: "#FF0000"}, 500);
//			$($("#player_"+current_player+" .die")[0]).effect("fade");

			$("#result").text("Perdistes, habian "+good_dice+".");
			$("#round_result").show();
			$("#start_round_btn").focus();
			result = -1;
		}
	};

	var bullshit = function() {
		reveal_dice();
	};

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
	$(".apostar").click(function() {
		submit_play();
	});
	$(".calzar").click(function() {
		calzar();
	});
	$(".bullshit").click(function() {
		bullshit();
	});

	var start_round = function() {
		// Update hands and eliminate players
		if (result == -1) {
			$("#player_"+current_player+" .die")[0].remove();
		} else {
			
		}

		// Clear data
		$("input").val("");
		$("#current_play").text("");
		current_play = [0, 0];
	
		// Shuffle dice
		$(".die").each(function(e) {
			$(this).html('<img alt="Dice" height="50" src="/assets/dice.png" width="50">');
			$(this).css("background-color", "#FFFFFF");
		});
		$(".die").each(function() {
			$(this).effect("bounce", parseInt($(this).attr("data-duration")));
		});

		// Hide results panel
		$("#round_result").hide();

		// Activate Player
		current_player = (current_player + 1) % num_players;
		activate_player(current_player);
		$("#player_"+current_player+" .calzar").attr("disabled", true);
		$("#player_"+current_player+" .bullshit").attr("disabled", true);
	};

	$("#start_round_btn").click(start_round);

	// Start
	start_round();
});
