import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.layers.experimental.preprocessing import RandomFlip, RandomRotation

# Load and preprocess the training and validation datasets


train_dataset = image_dataset_from_directory(
    '/Users/alexdang/Desktop/lebron_james_suu/Training_images',
    label_mode='binary',
    batch_size=128,
    image_size=(128, 128),
    color_mode='grayscale',
    shuffle=True,
    seed=42
)

validation_dataset = image_dataset_from_directory(
    '/Users/alexdang/Desktop/lebron_james_suu/Validation_images',
    label_mode='binary',
    batch_size=128,
    image_size=(128, 128),
    color_mode='grayscale',
    shuffle=True,
    seed=42
)

# Rescale pixel values
normalization_layer = tf.keras.layers.experimental.preprocessing.Rescaling(1./255)

train_dataset = train_dataset.map(lambda x, y: (normalization_layer(x), y))
validation_dataset = validation_dataset.map(lambda x, y: (normalization_layer(x), y))

from tensorflow.keras import layers, models, regularizers

model = models.Sequential([
    layers.Conv2D(16, (3, 3), activation='relu', input_shape=(128, 128, 1), 
                  kernel_regularizer=regularizers.l2(0.001)), 
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),  # Dropout
    layers.Conv2D(128, (3, 3), activation='relu', kernel_regularizer=regularizers.l2(0.001)),  # L2 regularization
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    layers.Conv2D(16, (3, 3), activation='relu', kernel_regularizer=regularizers.l2(0.001)),  # L2 regularization
    layers.MaxPooling2D((2, 2)),
  
    layers.Flatten(),
    layers.Dropout(0.5),
    layers.Dense(256, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
model_checkpoint = ModelCheckpoint('best_model.h5', monitor='val_accuracy', save_best_only=True)

history = model.fit(
    train_dataset,
    epochs=40,
    validation_data=validation_dataset,
    callbacks=[early_stopping, model_checkpoint]
)
model = tf.keras.models.load_model('best_model.h5')

test_dataset = image_dataset_from_directory(
    '/Users/alexdang/Desktop/lebron_james_suu/Training_images',
    label_mode='binary',
    batch_size=128,
    image_size=(128, 128),
    color_mode='grayscale', 
    shuffle=False
)

test_dataset = test_dataset.map(lambda x, y: (normalization_layer(x), y))

test_loss, test_accuracy = model.evaluate(test_dataset)
print(f"Test accuracy: {test_accuracy * 100:.2f}%")

model.save('cad_cnn_model_v9.h5')