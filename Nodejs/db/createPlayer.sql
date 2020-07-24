CREATE PROCEDURE createPlayer(
_nickname VARCHAR(30)
)
BEGIN
	INSERT INTO player (nickname)
    VALUES (_nickname);
END
