import "./styles.sass";
import {faForward, faHouse} from "@fortawesome/free-solid-svg-icons";
import Button from "@/common/components/Button";
import {getCharacterEmoji} from "@/common/data/characters";
import { useTranslation } from "react-i18next";

export const Scoreboard = ({scoreboard, nextQuestion, isEnd}) => {
    const { t } = useTranslation();

    const goHome = () => {
        location.reload();
    };

    return (
        <div className="scoreboard">
            <div className="top-area">
                {!isEnd && (
                    <Button
                        onClick={nextQuestion}
                        text={t("scoreboard.actions.next")}
                        padding="1rem 1.5rem"
                        icon={faForward}
                    />
                )}

                {isEnd && (
                    <Button
                        onClick={goHome}
                        text={t("scoreboard.actions.home")}
                        padding="1rem 1.5rem"
                        icon={faHouse}
                    />
                )}
            </div>

            <h1>{isEnd ? t("scoreboard.title.final") : t("scoreboard.title.live")}</h1>

            <div className="scoreboard-players">
                {scoreboard
                    .sort((a, b) => b.points - a.points)
                    .map((player, index) => (
                        <div key={index} className="scoreboard-player">
                            <div className="player-info">
                                <div className="player-character">
                                    {getCharacterEmoji(player.character)}
                                </div>
                                <h2>{player.name}</h2>
                            </div>
                            <h2>{player.points}</h2>
                        </div>
                    ))}
            </div>
        </div>
    )
}