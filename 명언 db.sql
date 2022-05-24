CREATE DATABASE a10;
USE a10;

CREATE TABLE wiseSaying(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reg_date DATETIME,
    content TEXT,
    author VARCHAR(100)
    );
    
DESC wiseSaying;

INSERT INTO wiseSaying
SET reg_date = "2022-12-12 12:12:12",
content = "슬픔은 자연히 해결된다. 그러나 기쁨의 가치를 충빈히 누리려면 기쁨을 함께 나눌 누군가가 필요하다.",
author ="마크 트웨인";

INSERT INTO wiseSaying
SET reg_date = "2022-12-12 12:12:12",
content = "슬픔은 자연히 해결된다. 그러나 기쁨의 가치를 충빈히 누리려면 기쁨을 함께 나눌 누군가가 필요하다.",
author ="마크 트웨인";

INSERT INTO wiseSaying
SET reg_date = "2022-12-12 12:12:12",
content = "슬픔은 자연히 해결된다. 그러나 기쁨의 가치를 충빈히 누리려면 기쁨을 함께 나눌 누군가가 필요하다.",
author ="마크 트웨인";

INSERT INTO wiseSaying(id, reg_date, content, author)
VALUES
('','2022-12-13 12:12:12', '내 인생에서 한가지 후회는 내가 남이 아니라는 것이다.', '우디 알렌'),
('','2022-12-14 12:12:12', '철학자가 이야기한 적이 있는 것보다 더 터무니없는 것은 없다.', '키케로'),
('','2022-12-15 12:12:12', '배우는 사람은 모름지기 심신(心身)을 수련해야 한다.', '퇴계 이황'),
('','2022-12-16 12:12:12', '이른 아침은 입에 황금을 물고 있다.', '벤자민 프랭클린'),
('','2022-12-17 12:12:12', '기적은 그것을 믿는 사람에게만 일어난다.', '버나스 베렌슨'),
('','2022-12-18 12:12:12', '우리가 두려워해야 할 것은 오직 "두려움" 그 자체', '프랭클린 루즈벨트'),
('','2022-12-19 12:12:12', '우리가 변화하기전까지는 세계도 변화하지 않을것이다.', '짐 웰스'),
('','2022-12-20 12:12:12', '난 준비할 것이며,그럼 언젠가 나에게 기회가 올 것이다.', '에이브러햄 링컨'),
('','2022-12-21 12:12:12', '뜻이 서지 않으면 만사가 성공하지 못한다. 먼저 반듯이 뜻을 세워라', '율곡 이이');

UPDATE wiseSaying
SET content = "우리는 우리가 어떤사람인지 알지만, 어떤 사람이 될 수 있는지는 모른다."
WHERE id = 1;

SELECT * FROM wiseSaying;


