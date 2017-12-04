angular.module('zomboid', [])
.controller('main', ['$scope', '$http', function($scope, $http) {
		$scope.data = {}, $scope.showTable = false, $scope.metricResults = [], $scope.weapons = [];
		$scope.advantagesFirst = function(card) {
		if (card.result == "Advantage") return 0;
		else if (card.result == "Equal") return 1;
		else return 2;
		}
		$scope.itemChecklist = [];
		$scope.newItem = '';
		$scope.addTools = function() {
		$scope.newGroup = {};
		$scope.newGroup.name = 'Tools';
		$scope.newGroup.items = [
		{item:'Hammer'},
		{item:'Screwdriver'},
		{item:'Saw'},
		{item:'Crowbar'},
		{item:'Sledgehammer'}
		];
		$scope.itemChecklist.push($scope.newGroup);
		}
		$scope.addBooks = function() {
			$scope.newGroup = {};
			$scope.newGroup.name = 'Books';
			$scope.newGroup.items = [
			{item:'Beginner Carpentry'},
			{item:'Intermediate Carpentry'},
			{item:'Advanced Carpentry'},
			{item:'Expert Carpentry'},
			{item:'Master Carpentry'},

			{item:'Beginner Cooking'},
			{item:'Intermediate Cooking'},
			{item:'Advanced Cooking'},
			{item:'Expert Cooking'},
			{item:'Master Cooking'},

			{item:'Beginner Farming'},
			{item:'Intermediate Farming'},
			{item:'Advanced Farming'},
			{item:'Expert Farming'},
			{item:'Master Farming'},

			{item:'Beginner First Aid'},
			{item:'Intermediate First Aid'},
			{item:'Advanced First Aid'},
			{item:'Expert First Aid'},
			{item:'Master First Aid'},

			{item:'Beginner Electrical'},
			{item:'Intermediate Electrical'},
			{item:'Advanced Electrical'},
			{item:'Expert Electrical'},
			{item:'Master Electrical'}
			];
			$scope.itemChecklist.push($scope.newGroup);
		}
		$scope.addItemEnter = function(group,groupName,keyCode){
			//User hit enter or keyCode is undefined
			if (keyCode == 13 || keyCode == undefined){
				$scope.itemChecklist[group].items.push({item:''});
				var elementFocus = '#' + groupName + ' input';
				setTimeout(function(){
						$(elementFocus).last().focus();
						},0);
			}
		}
		$scope.addGroup = function() {
			$scope.newGroup = {};
			$scope.newGroup.name = 'New Group';
			$scope.newGroup.items = [];
			$scope.itemChecklist.push($scope.newGroup);
			console.log($scope.itemChecklist);
		}
		$scope.listGroups = function() { 
			console.log($scope.itemChecklist);
		}
		$scope.removeGroup = function(group){
			$scope.itemChecklist.splice(group,1);
		}
		$scope.remove = function(item,group){
			$scope.itemChecklist[group].items.splice(item,1);
		}
		$scope.switch = function() {
			[$scope.data.weaponOne, $scope.data.weaponTwo] = [$scope.data.weaponTwo, $scope.data.weaponOne];
			$scope.weaponAdvantages();
		}
		$http.get('/getWeapons')
			.then(function(response) {
					$scope.weapons = response.data;
					});
		$scope.checkInputs = function() {
			if ($scope.data.weaponOne != undefined && $scope.data.weaponTwo != undefined) {
				$scope.weaponAdvantages();
				$scope.showTable = true;
			} else $scope.showTable = false;
		}
		$scope.weaponAdvantages = function() {
			$scope.metrics = [{
				"metric": "MaxDamage",
					"displayName": "Maximum Damage",
					"advantage": ">"
			}, {
				"metric": "MinDamage",
					"displayName": "Minimum Damage",
					"advantage": ">"
			}, {
				"metric": "CriticalChance",
					"displayName": "Critical Chance",
					"advantage": ">"
			}, {
				"metric": "Weight",
					"displayName": "Weight",
					"advantage": "<"
			}, {
				"metric": "ConditionMax",
					"displayName": "Maximum Durability",
					"advantage": ">"
			}, {
				"metric": "ConditionLowerChanceOneIn",
					"displayName": "Odds of Breaking (lower is more often)",
					"advantage": ">"
			}, {
				"metric": "MaxRange",
					"displayName": "Maximum Range",
					"advantage": ">"
			}, {
				"metric": "SwingTime",
					"displayName": "Weapon Speed",
					"advantage": "<"
			}];
			$scope.metricResults = [];
			var a = $scope.data.weaponOne;
			var b = $scope.data.weaponTwo;
			for (var i = 0; i < $scope.metrics.length; i++) {
				var metricInstance = {};
				metricInstance.metric = $scope.metrics[i].metric;
				metricInstance.displayValue = $scope.metrics[i].displayName;
				metricInstance.weaponOneVal = a[$scope.metrics[i].metric];
				metricInstance.weaponTwoVal = b[$scope.metrics[i].metric];
				if (((a[$scope.metrics[i].metric] - b[$scope.metrics[i].metric]) > 0) && $scope.metrics[i].advantage == ">")
					metricInstance.result = "Advantage";
				else if (((a[$scope.metrics[i].metric] - b[$scope.metrics[i].metric]) < 0) && $scope.metrics[i].advantage == "<")
					metricInstance.result = "Advantage";
				else if (a[$scope.metrics[i].metric] == b[$scope.metrics[i].metric])
					metricInstance.result = "Equal";
				else
					metricInstance.result = "Disadvantage";

				$scope.metricResults.push(metricInstance);
			}
			return;
		}
}]);

