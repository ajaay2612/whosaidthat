import './createPost.js';

import { Devvit, useState, useForm , useAsync } from '@devvit/public-api';

// Defines the messages that are exchanged between Devvit and Web View
type WebViewMessage =
  | {
      type: 'initialData';
      data: {
        username: string;
        currentCounter: number;
        question: string;
        isGameData: boolean;
        choice_one_text: string;
        choice_two_text: string;
        choice_one_image: string;
        choice_two_image: string;
        correct_choice: string | number;
        creator_username: string;
        is_creator: boolean;
        postId: string | null;
        choiceOutcome: {
          0: number;
          1: number;
        };
        answered: number | null;

      };
    }
  | {
      type: 'getLeaderboard';
      data: {
        leaderboard: Array<{
          rank: number;
          username: string;
          score: number;
        }>;
      };
    }
  | {
      type: 'setGameData';
      data: {
        question: string;
        choice_one_text: string;
        choice_two_text: string;
        choice_one_image: string;
        choice_two_image: string;
        correct_choice: string | number;
      };
    }
  | {
      type: 'gameDataUpdated';
      data: {
        username: string;
        postId: string | null;
      };
    }
  | {
      type: 'submitChoice';
      data: {
        selectedChoice: 0 | 1;
      };
    }
  | {
      type: 'choiceSubmitted';
      data: {
        updatedChoiceOutcome: {
          0: number;
          1: number;
        };
      };
    }
  | {
      type: 'addImage';
      data: {};
    };

Devvit.configure({
  media: true,
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Who Said That',
  height: 'tall',
  render: (context) => {
    
    const imageUploadForm = useForm(
      {
        fields: [
          {
            name: 'imageUpload',
            type: 'image',
            label: 'Select an image to upload (WebP not allowed)',
            required: true,
          },
        ],
      },
      async (values) => {
        // onSubmit handler
        let imageUrlUp = values.imageUpload;
        // Check if the uploaded file is a WebP
        const isWebP = imageUrlUp.toLowerCase().endsWith('.webp');
        
        if (isWebP) {
          context.ui.showToast('WebP files are not allowed. Please upload a different image format.')
          imageUrlUp = "/placeholder.jpeg"
        }

        console.log('Image URL:', imageUrlUp);
      
        context.ui.webView.postMessage('myWebView', {
          type: 'imageUploaded',
          data: {
            imageUrl: imageUrlUp
          }
        } as const);

        // if (imageUrlUp) {
        //   try {

        //     const response = await context.media.upload({
        //       type: 'image',
        //       url: imageUrlUp
        //     });
        //     const permanentImageUrl = response.mediaUrl;

        //     context.ui.webView.postMessage('myWebView', {
        //       type: 'imageUploaded',
        //       data: {
        //         imageUrl: permanentImageUrl
        //       }
        //     } as const);
        //   } catch (error) {
        //     console.error('Error saving image URL:', error);
        //     context.ui.showToast('Failed to save image URL');
        //   }
        // }
      }
    );

    // Load username with `useAsync` hook
    const [username] = useState(async () => {
      const currUser = await context.reddit.getCurrentUser();
      return currUser?.username ?? 'anon';
    });

    // Create a reactive state for web view visibility
    const [webviewVisible, setWebviewVisible] = useState(true);

    // When the web view invokes `window.parent.postMessage` this function is called
    const onMessage = async (msg: WebViewMessage) => {
      switch (msg.type) {
        case 'setGameData':
          let gameData = {
            creator_username: username,
            question: msg.data.question,
            choice_one_text: msg.data.choice_one_text,
            choice_two_text: msg.data.choice_two_text,
            choice_one_image: msg.data.choice_one_image,
            choice_two_image: msg.data.choice_two_image,
            correct_choice: msg.data.correct_choice,
            choiceOutcome: { 0: 0, 1: 0 } // Initialize with zero votes for each choice
          };

          // Post the app with the new data
          const newPost = await context.reddit.submitPost({
            title: 'Who Said That',
            subredditName: await (await context.reddit.getCurrentSubreddit()).name,
            preview: (
              <vstack height="100%" width="100%" alignment="middle center">
                <text size="large">Loading ...</text>
              </vstack>
            ),
          });

          // Store the game data in Redis with post-specific key
          await context.redis.set(`gameData_${newPost.id}`, JSON.stringify(gameData));
          // console.log(`Game data stored for post ${newPost.id}`);
          // Get the URL of the newly created post
          const postUrl = newPost.url;

          // Send confirmation back to the webview
            context.ui.webView.postMessage('myWebView', {
            type: 'gameDataUpdated',
            data: {
              postId: newPost.id,
              creator_username: username,
              postUrl: postUrl
            }
            } as const);

            // Route to the new post URL
            context.ui.navigateTo(postUrl);
          break;

        case 'addImage':
          context.ui.showForm(imageUploadForm);
          break;

        case 'submitChoice':
          const postId = context.postId;
          const selectedChoice = msg.data.selectedChoice;
          const userId = await context.reddit.getCurrentUser().then(user => user.id);

          // Retrieve existing game data
          const gameDataString = await context.redis.get(`gameData_${postId}`);
          if (!gameDataString) {
              console.error('Game data not found');
              return;
          }

          let submitGameData = JSON.parse(gameDataString);

          // Update choice outcome
          if (!submitGameData.choiceOutcome) {
              submitGameData.choiceOutcome = { 0: 0, 1: 0 };
          }
          submitGameData.choiceOutcome[selectedChoice] += 1;
          
          // Store updated game data
          await context.redis.set(`gameData_${postId}`, JSON.stringify(submitGameData));
          
          // Store user's choice
          await context.redis.set(`userChoice_${postId}_${userId}`, selectedChoice.toString());
  


          if (selectedChoice === submitGameData.correct_choice) {
            await context.redis.zIncrBy('universal_leaderboard', username, 1);
            console.log('Correct choice made by user and updated:', username);

          }
          const leaderboard = await context.redis.zRange('universal_leaderboard', 0, 9, { 
              reverse: true,
              by: 'score'
          });


          // Send confirmation back to the webview
          context.ui.webView.postMessage('myWebView', {
            type: 'choiceSubmitted',
            data: {
                updatedChoiceOutcome: submitGameData.choiceOutcome,
                leaderboard: leaderboard
            }
          });
          break;
          
        case 'getLeaderboard':
          const currentUser = await context.reddit.getCurrentUser();
          const currentUsername = username;
      
          // Get the total number of entries in the leaderboard
          const totalEntries = await context.redis.zCard('universal_leaderboard');

          let allEntries = totalEntries + (totalEntries *3)

          // Get all entries from the universal leaderboard
          const allLeaderboardData = await context.redis.zRange('universal_leaderboard', 0, allEntries, { 
            by: 'score',
            reverse: true
          });

          console.log('totalEntries', totalEntries);
          console.log('totalEntriesType of',  totalEntries);

          console.log('All leaderboard data:', allLeaderboardData);
          
      
          // Find the current user's rank and score
          let currentUserRank = null;
          let currentUserScore = null;
          for (let i = 0; i < allLeaderboardData.length; i++) {
              if (allLeaderboardData[i].member === currentUsername) {
                  currentUserRank = i + 1;
                  currentUserScore = allLeaderboardData[i].score;
                  break;
              }
          }
      
          // Get the top 10 users
          const topLeaderboardData = allLeaderboardData.slice(0, 5);
      
          // Format the leaderboard data
          const formattedLeaderboard = topLeaderboardData.map((entry, index) => ({
              rank: index + 1,
              username: entry.member,
              score: entry.score
          }));
      
          // Send the leaderboard data back to the webview
          context.ui.webView.postMessage('myWebView', {
              type: 'getLeaderboard',
              data: {
                  leaderboard: formattedLeaderboard,
                  currentUser: {
                      username: currentUsername,
                      rank: currentUserRank,
                      score: currentUserScore
                  }
              }
          });
          break;
    
        case 'initialData':
          const gameDataIni = await context.redis.get(`gameData_${context.postId}`);
          // console.log(`Game data retrieved for post ${context.postId}: ${gameDataIni}`);
          const parsedGameData = gameDataIni ? JSON.parse(gameDataIni) : null;

          const userIdIni = await context.reddit.getCurrentUser().then(user => user.id);
          const userChoiceString = await context.redis.get(`userChoice_${context.postId}_${userIdIni}`);
          const userChoice = userChoiceString ? parseInt(userChoiceString) : null;

          context.ui.webView.postMessage('myWebView', {
            type: 'initialData',
            data: {
              username: username,
              isGameData: !!parsedGameData,
              question: parsedGameData?.question ?? '',
              choice_one_text: parsedGameData?.choice_one_text ?? '',
              choice_two_text: parsedGameData?.choice_two_text ?? '',
              choice_one_image: parsedGameData?.choice_one_image ?? '',
              choice_two_image: parsedGameData?.choice_two_image ?? '',
              correct_choice: parsedGameData?.correct_choice ?? '',
              creator_username: parsedGameData?.creator_username ?? '',
              is_creator: parsedGameData?.creator_username === username,
              postId: context.postId ?? null,
              choiceOutcome: parsedGameData?.choiceOutcome ?? { 0: 0, 1: 0 },
              answered: userChoice !== null ? userChoice : null

            }
          });
          break;
    
        default:
          throw new Error(`Unknown message type: ${msg satisfies never}`);
      }
    };

    // When the button is clicked, send initial data to web view and show it
    // const onShowWebviewClick = async () => {
    //   setWebviewVisible(true);
    //   const gameData = await context.redis.get(`gameData_${context.postId}`);
    //   // console.log(`Game data retrieved for post ${context.postId}: ${gameData}`);
    //   const parsedGameData = gameData ? JSON.parse(gameData) : null;

    //   const userId = await context.reddit.getCurrentUser().then(user => user.id);
    //   const userChoiceString = await context.redis.get(`userChoice_${context.postId}_${userId}`);
    //   const userChoice = userChoiceString ? parseInt(userChoiceString) : null;

    //   context.ui.webView.postMessage('myWebView', {
    //     type: 'initialData',
    //     data: {
    //       username: username,
    //       isGameData: !!parsedGameData,
    //       question: parsedGameData?.question ?? '',
    //       choice_one_text: parsedGameData?.choice_one_text ?? '',
    //       choice_two_text: parsedGameData?.choice_two_text ?? '',
    //       choice_one_image: parsedGameData?.choice_one_image ?? '',
    //       choice_two_image: parsedGameData?.choice_two_image ?? '',
    //       correct_choice: parsedGameData?.correct_choice ?? '',
    //       creator_username: parsedGameData?.creator_username ?? '',
    //       is_creator: parsedGameData?.creator_username === username,
    //       postId: context.postId ?? null,
    //       choiceOutcome: parsedGameData?.choiceOutcome ?? { 0: 0, 1: 0 },
    //       answered: userChoice !== null ? userChoice : null

    //     }
    //   });
    // };

    // const { data, loading, error } = useAsync(async () => {
    //   await onShowWebviewClick();
    //   console.log('Webview loaded');
    //   return { success: true }; // Return a JSON-serializable value
    // });
  
    
  
    // Render the custom post type
    return (
      <vstack grow padding="small">
        {/* <vstack
          grow={!webviewVisible}
          height={webviewVisible ? '0%' : '100%'}
          alignment="middle center"
        >
          <text size="xlarge">
          who said that? weddf
          </text>
          <spacer />
          <button onPress={onShowWebviewClick}>Play</button>
        </vstack> */}
        <vstack grow={webviewVisible} height={webviewVisible ? '100%' : '0%'}>
          <vstack border="thick" borderColor="black" height={webviewVisible ? '100%' : '0%'}>
            <webview
              id="myWebView"
              url="index.html"
              onMessage={(msg) => onMessage(msg as WebViewMessage)}
              grow
              height={webviewVisible ? '100%' : '0%'}
            />
          </vstack>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
