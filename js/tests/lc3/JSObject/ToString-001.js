/* -*- Mode: java; tab-width: 8 -*-
 * Copyright (C) 1997, 1998 Netscape Communications Corporation,
 * All Rights Reserved.
 */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozilla Communicator client code, released
 * March 31, 1998.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 *  JavaScript to Java type conversion.
 *
 *  This test passes JavaScript number values to several Java methods
 *  that expect arguments of various types, and verifies that the value is
 *  converted to the correct value and type.
 *
 *  This tests instance methods, and not static methods.
 *
 *  Running these tests successfully requires you to have
 *  com.netscape.javascript.qa.liveconnect.DataTypeClass on your classpath.
 *
 *  Specification:  Method Overloading Proposal for Liveconnect 3.0
 *
 *  @author: christine@netscape.com
 *
 */
var SECTION = "JavaScript Object to java.lang.String";
var VERSION = "1_4";
var TITLE   = "LiveConnect 3.0 JavaScript to Java Data Type Conversion " +
SECTION;
startTest();

var dt = new DT();

var a = new Array();
var i = 0;

function MyObject( stringValue ) {
    this.stringValue = String(stringValue);
    this.toString = new Function( "return this.stringValue" );
}

function MyFunction() {
    return "hello";
}
MyFunction.toString = new Function( "return \"MyFunction\";" );

// 3.3.6.4 Other JavaScript Objects
// Passing a JavaScript Object to a Java method that expects a
// java.lang.String calls the JS object's toString method, and
// returns the result as a java.lang.String.


var stringValue = "JavaScript String Value";

a[i++] = new TestObject(
    "dt.setStringObject( new String(\""+stringValue+"\"))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    stringValue,
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new MyObject(\""+stringValue+"\"))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    stringValue,
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Boolean(true))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "true",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Boolean(false))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "false",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Object())",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "[object Object]",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Number(0))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "0",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Number(NaN))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "NaN",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Number(Infinity))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "Infinity",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Number(-Infinity))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "-Infinity",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( new Array(1,2,3))",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "1,2,3",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( MyObject )",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    MyObject.toString(),
    java.lang.Class.forName("java.lang.String"));

var THIS = this;

a[i++] = new TestObject(
    "dt.setStringObject( THIS )",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    GLOBAL,
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( Math )",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "[object Math]",
    java.lang.Class.forName("java.lang.String"));

a[i++] = new TestObject(
    "dt.setStringObject( MyFunction )",
    "dt.PUB_STRING +''",
    "dt.getStringObject() +''",
    "dt.getStringObject().getClass()",
    "MyFunction",
    java.lang.Class.forName("java.lang.String"));

for ( i = 0; i < a.length; i++ ) {
    new TestCase(
	a[i].description +"; "+ a[i].javaFieldName,
	a[i].jsValue,
	a[i].javaFieldValue );

    new TestCase(
	a[i].description +"; " + a[i].javaMethodName,
	a[i].jsValue,
	a[i].javaMethodValue );

    new TestCase(
	a[i].javaTypeName,
	a[i].jsType,
	a[i].javaTypeValue );
}

test();

function TestObject( description, javaField, javaMethod, javaType,
		     jsValue, jsType )
{
    eval (description );

    this.description = description;
    this.javaFieldName = javaField;
    this.javaFieldValue = eval( javaField );
    this.javaMethodName = javaMethod;
    this.javaMethodValue = eval( javaMethod );
    this.javaTypeName = javaType,
	this.javaTypeValue = eval( javaType );

    this.jsValue   = jsValue;
    this.jsType      = jsType;
}
