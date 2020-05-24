package com.daodao;

import com.facebook.react.ReactActivity;
import com.theweflex.react.WeChatPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Daodao";
  }

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
     ...
      new WeChatPackage()
    );
  }

}
