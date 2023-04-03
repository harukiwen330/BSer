# BSer Party Game
    An open-source game for deception and mastering world's knowledge.
    Develop the project using the T3 Stack.
    A free multiplayer game currently in development.

# 3 Roles, 1 Truth
    1 Truth Teller, who receives the definition of a phrase from the Wikipedia API (wtf_wikipedia).
    1 Finder, who listens to everyone and selects the Truth Teller.
    1 ~ 5 Liars, who don't have a definition from the game and must deceive the Finder into believing they're the Truth Teller.

# Steps
1. Host and join a lobby.
2. Finder selects a word or phrase they're unfamiliar with.
3. Truth Teller and Liars are given 35 seconds to memorize or concoct lies.
4. While listening to everyone, Finder first chooses a player to silence.
    4.1 If the silenced player is the Truth Teller, both players lose 1 point.
    4.2 If the silenced player is a Liar, the Liar loses 1 point, and the Finder gains 1 point.
5. After listening to everyone, Finder picks a player as the Truth Teller.
    5.1 If the chosen player is the Truth Teller, both players gain 1 point.
    5.2 If the chosen player is a Liar, the Liar gains 1 point, and the Finder loses 1 point.
6. The answer is revealed to everyone along with the scoreboard.
7. Click "new game" to shuffle roles and play again.
# Todo list in the Project
1. Add management for host to kick players if needed.
2. Considering a array list of players who have not been a Finder, to make sure all players at least have a chance to guess
    