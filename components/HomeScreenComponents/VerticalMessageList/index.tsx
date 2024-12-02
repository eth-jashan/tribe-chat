import Avatar from "@/components/common/Avatar";
import React, { useEffect, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Button,
} from "react-native";
import moment from "moment";
import { useMessageStore } from "@/store/useMessageStore";
import { useParticipantStore } from "@/store/useProfileStore";

const NEW_MESSAGES_CHECK_INTERVAL = 10000; // 10 seconds
const MESSAGES_BATCH_SIZE = 25; // Number of messages to load per batch

const VerticalMessageList = ({ onMessagePress, onLongMessagePress }) => {
  const {
    messages,
    fetchMessages,
    fetchOlderMessages,
    checkForNewMessages,
    newMessagesAvailable,
    setNewMessagesAvailable,
    // fetchNewMessages, // Added to fetch new messages when scrolling to the end
  } = useMessageStore();
  const { participants, fetchParticipants } = useParticipantStore();
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchParticipants(); // Fetch participants when component mounts
    fetchMessages(); // Fetch initial messages when component mounts

    const interval = setInterval(async () => {
      const hasNewMessages = await checkForNewMessages();
      if (hasNewMessages) {
        setNewMessagesAvailable(true);
      }
    }, NEW_MESSAGES_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [
    fetchMessages,
    checkForNewMessages,
    setNewMessagesAvailable,
    fetchParticipants,
  ]);

  const loadOlderMessages = async () => {
    if (messages.length === 0) return;
    await fetchOlderMessages(messages[0].uuid);
  };

  // const loadNewMessages = async () => {
  //   await fetchNewMessages();
  // };

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderDateSeparator = (date) => (
    <View style={styles.dateSeparatorContainer}>
      <Text style={styles.dateSeparatorText}>{date}</Text>
    </View>
  );

  const renderMessageItem = (message, isInitialMessage) => {
    const author = participants.find((p) => p.uuid === message.authorUuid);
    const authorName = author ? author.name : "Unknown";
    const authorAvatarUrl = author
      ? author.avatarUrl
      : "https://via.placeholder.com/40";

    return (
      <View style={styles.messageGroupContainer}>
        {isInitialMessage && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar uri={authorAvatarUrl} style={styles.avatar} />
            <Text style={styles.messageAuthor}>{authorName}</Text>
          </View>
        )}
        <TouchableOpacity
          key={message.uuid}
          style={[
            styles.messageContainer,
            !isInitialMessage && styles.groupedMessageContainer,
          ]}
          onPress={() => onMessagePress(message)}
          onLongPress={() => onLongMessagePress(message)}
        >
          <View style={styles.messageContent}>
            <Text style={styles.messageTime}>
              {moment(message.updateAt ?? message.sentAt).format("hh:mm A")}
            </Text>

            {message.updateAt ? (
              <Text style={styles.messageTime}>edited</Text>
            ) : null}

            <Text style={styles.messageText}>{message.text}</Text>

            {message.attachments && message.attachments.length > 0 && (
              <View style={styles.attachmentsContainer}>
                {message.attachments.map(
                  (attachment) =>
                    attachment.type === "image" && (
                      <Image
                        key={attachment.uuid}
                        source={{ uri: attachment.url }}
                        style={{
                          width: attachment.width / 4,
                          height: attachment.height / 4,
                          marginTop: 10,
                        }}
                      />
                    )
                )}
              </View>
            )}
            {message.reactions && message.reactions.length > 0 && (
              <FlatList
                data={message?.reactions}
                horizontal
                renderItem={({ item }) => {
                  return (
                    <Text key={item?.uuid} style={styles.reaction}>
                      {item?.value}
                    </Text>
                  );
                }}
                contentContainerStyle={styles.reactionsContainer}
                keyExtractor={(_, i) => i?.toString()}
                showsVerticalScrollIndicator={true}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const groupedMessagesByDate = messages.reduce((acc, message) => {
    const date = moment(message.sentAt).format("MMMM DD, YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  const flatData = [];

  Object.keys(groupedMessagesByDate).forEach((date) => {
    flatData.push({ type: "date", date });
    let previousAuthorUuid = null;
    groupedMessagesByDate[date].forEach((message) => {
      const isInitialMessage = previousAuthorUuid !== message.authorUuid;
      flatData.push({ type: "message", message, isInitialMessage });
      previousAuthorUuid = message.authorUuid;
    });
  });

  const renderItem = ({ item }) => {
    if (item.type === "date") {
      return renderDateSeparator(item.date);
    } else if (item.type === "message") {
      return renderMessageItem(item.message, item.isInitialMessage);
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={flatData}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.type === "date" ? item.date : item.message.uuid
        }
        showsVerticalScrollIndicator={true}
        // Load new messages when scrolling to the end
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#2c2f33",
  },
  dateSeparatorContainer: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#2c2f33",
  },
  dateSeparatorText: {
    fontSize: 16,
    color: "#b9bbbe",
    fontWeight: "bold",
  },
  messageGroupContainer: {
    padding: 8,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderColor: "#222529",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
  },
  groupedMessageContainer: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageGroupContent: {
    flex: 1,
    marginLeft: 8,
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
    marginLeft: 4,
  },
  messageTime: {
    fontSize: 14,
    fontWeight: "light",
    color: "#ffffff",
    marginBottom: 4,
    marginLeft: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#b9bbbe",
  },
  messageContent: {
    flexDirection: "column",
  },
  attachmentsContainer: {
    marginTop: 8,
  },
  reactionsContainer: {
    backgroundColor: "#222529",
    padding: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  reaction: {
    marginRight: 8,
    fontSize: 16,
  },
  newMessagesButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default VerticalMessageList;
