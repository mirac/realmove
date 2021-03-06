package user.users.DTO;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

public class ConversationDTO implements Serializable {

    private static final long serialVersionUID = -2359712335612538065L;

    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String conversationId;

    @Getter @Setter
    private String fromUserId;

    @Getter @Setter
    private String toUserId;

    @Getter @Setter
    private String advertId;

    @Getter @Setter
    private List<MessageDTO> messageList;
}