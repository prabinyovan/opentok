angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
    
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  
  
  $scope.connectToOpenTok = function(){
      
      apiKey = "45217062"; 
      sessionId = "2_MX40NTIxNzA2Mn5-MTQzMDI5NDIzNjAxOX5qbnI1b0NLSjZXQXZ0VjJGOFhZckFzNjJ-fg"; 
      token = "T1==cGFydG5lcl9pZD00NTIxNzA2MiZzaWc9NTFhMjcwNzY4MzRhNTk3YTViZjlhNThlMDRmNDU2N2U5ODQzZWFjNjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5USXhOekEyTW41LU1UUXpNREk1TkRJek5qQXhPWDVxYm5JMWIwTkxTalpYUVhaMFZqSkdPRmhaY2tGek5qSi1mZyZjcmVhdGVfdGltZT0xNDMwMjk0MjQ5Jm5vbmNlPTAuOTgxMzMwNzQ5MDM0MTQ0OSZleHBpcmVfdGltZT0xNDMyODg0NzA2JmNvbm5lY3Rpb25fZGF0YT0="; 
    
      var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            subscribeToAudio: true,
            subscribeToVideo: true
        });
        alert(' streamCreated ');
        OT.updateViews();
    });

    // Handler for sessionDisconnected event
    session.on('sessionDisconnected', function(event) {
        console.log('You were disconnected from the session.', event.reason);
    });

    // Connect to the Session
    session.connect(token, function(error) {
        // If the connection is successful, initialize a publisher and publish to the session
        if (!error) {
            var publisher = OT.initPublisher('publisher', {
            });
            alert('Session connected!');
            session.publish(publisher);
            OT.updateViews();

        } else {
            alert('There was an error connecting to the session: ' + error.message);
        }

    });
        
  }
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
