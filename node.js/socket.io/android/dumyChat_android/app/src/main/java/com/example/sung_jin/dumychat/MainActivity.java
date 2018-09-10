package com.example.sung_jin.dumychat;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText me, other;
    private Button enter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        me = (EditText)findViewById(R.id.me);
        other = (EditText)findViewById(R.id.other);
        enter = (Button)findViewById(R.id.enter);

        enter.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        Intent intent = new Intent(this, ChatActivity.class);
        intent.putExtra("me",me.getText().toString());
        intent.putExtra("other",other.getText().toString());
        startActivity(intent);
        finish();
    }
}
