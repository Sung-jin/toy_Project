package com.example.sung_jin.dumychat;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class ChatActivity extends AppCompatActivity {

    private Socket mSocket;
    private String me, other;
    //나와 상대방 아이디 저장 변수
    private int roomNum;
    //메시지 방 번호

    private EditText message;
    private Button send;
    private LinearLayout chatLog;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chat);

        message = (EditText)findViewById(R.id.message);
        send = (Button)findViewById(R.id.send);
        chatLog = (LinearLayout)findViewById(R.id.chatLog);

        Intent intent = getIntent();
        me = intent.getStringExtra("me");
        other = intent.getStringExtra("other");

        try {
            mSocket = IO.socket("socket.io ip here");

            mSocket.on(Socket.EVENT_CONNECT, onFindRoom);
            //소켓 연결 시 이벤트
            mSocket.on("join room", onJoinRoom);
            //방에 입장 시 이벤트
            mSocket.on("new message", onNewMessage);
            //메시지가 오는 이벤트

            mSocket.connect();
        } catch(URISyntaxException e) {
            e.printStackTrace();
        }

        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                attemptSend();
            }
        });
    }

    private Emitter.Listener onFindRoom = new Emitter.Listener(){
        @Override
        public void call(Object... args) {

            mSocket.emit("find room", me, other);
            //나와 상대방의 아이디를 기반으로 소켓 서버에 요청하여 방 정보 가져오는 이벤트
        }
    };

    private Emitter.Listener onJoinRoom = new Emitter.Listener(){
        //방에 입장 시 기존방에 메시지가 있을 시 가져와서 초기화
        @Override
        public void call(final Object... args) {
            (ChatActivity.this).runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject data = (JSONObject) args[0];
                    Boolean success;

                    try {
                        success = Boolean.parseBoolean(data.getString("success"));
                        if(success){
                            roomNum = Integer.parseInt(data.getString("room_Num"));
                            JSONArray entered = data.getJSONArray("entered");
                            JSONArray message = data.getJSONArray("message");

                            TextView[] msgLog = new TextView[message.length()];
                            for(int i = 0; i < entered.length(); i++){
                                msgLog[i] = new TextView(ChatActivity.this);
                                msgLog[i].setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                                msgLog[i].setText(entered.getJSONObject(i).getString("entered") + " : " + message.getJSONObject(i).getString("content"));
                                chatLog.addView(msgLog[i]);
                            }

                        }

                    } catch (JSONException e) {
                        return;
                    }

                }
            });
        }
    };

    private Emitter.Listener onNewMessage = new Emitter.Listener(){
        //메시지가 서버에서 올 시 반응하는 이벤트
        @Override
        public void call(final Object... args) {
            (ChatActivity.this).runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject data = (JSONObject) args[0];
                    Boolean success;

                    try {
                        success = Boolean.parseBoolean(data.getString("success"));
                        if(success){
                            JSONArray entered = data.getJSONArray("entered");
                            JSONArray message = data.getJSONArray("message");

                            TextView msgLog = new TextView(ChatActivity.this);
                            msgLog.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT));
                            msgLog.setText(entered.getJSONObject(0).getString("entered") + " : " + message.getJSONObject(0).getString("content"));
                            chatLog.addView(msgLog);

                        }

                    } catch (JSONException e) {
                        return;
                    }

                }
            });
        }
    };

    private void attemptSend() {
        String msg = message.getText().toString().trim();
        String image = null;

        if(TextUtils.isEmpty(msg)){
            return;
        }

        message.setText("");
        mSocket.emit("new message", roomNum, me, msg, image);
        //메시지를 작성 후 버튼을 통해 보낼 때 보내는 이벤트
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        mSocket.disconnect();
    }
}
